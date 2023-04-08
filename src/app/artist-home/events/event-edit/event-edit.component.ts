import { formatDate, Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable, Subject, takeUntil } from 'rxjs';

import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/app.state';
import {
  ArtistEventForManipulationDto,
  eventValidationMessages,
} from '../../models';
import { getCurrentEvent, getError } from '../../state';
import { createArtistEvent, updateArtistEvent } from '../../state/actions/artist-api-actions';
;

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
  };
}

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('FromControlName') FormInputElements!: ElementRef[];
  updateForm!: FormGroup;
  genericValidator!: GenericValidator;
  errorMessages!: { [key: string]: string };
  private destroyed$ = new Subject<void>();
  eventId!: string;
  artistId!: string;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.genericValidator = new GenericValidator(eventValidationMessages);
  }

  ngAfterViewInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.artistId = this.route.parent?.snapshot.paramMap.get('artistId')!;

    if (this.eventId !== '0') {
      this.store.select(getCurrentEvent(this.eventId)).subscribe((val) => {
        this.updateForm.patchValue({
          name: val?.entity.Name,
          categoryId: val?.entity.CategoryId,
          url: val?.entity.Url,
          date: val?.entity.Date,
          country: val?.entity.Country,
          city: val?.entity.City,
          description: val?.entity.Description,
        });
      });
    }

    const inputBlurs$: Observable<any>[] = this.FormInputElements.map(
      (control) => fromEvent(control.nativeElement, 'blur')
    );

    merge(inputBlurs$, this.updateForm.valueChanges)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.errorMessages = this.genericValidator.processMessages(
          this.updateForm
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', [Validators.required]],
      url: ['', [Validators.required]],
      medium: ['', [Validators.required]],
      date: [Date, [Validators.required, dateValidator()]],
      country: ['', Validators.required],
      city: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });

    this.updateForm
      .get('medium')
      ?.valueChanges.pipe()
      .subscribe((value) => {
        let url = this.updateForm.get('url');
        let country = this.updateForm.get('country');
        let city = this.updateForm.get('city');
        if (value === 'live') {
          url?.disable();
          country?.enable();
          city?.enable();
          return;
        }
        if (value === 'virtual') {
          country?.disable();
          city?.disable();
          url?.enable();
          return;
        }
        country?.enable();
        city?.enable();
        url?.enable();
      });
  }

  submit = () => {
    let error;
    let event: ArtistEventForManipulationDto = {
      ...this.updateForm.value,
    };

    if (this.eventId === '0'){

      this.store.dispatch(
        createArtistEvent({ artistId: this.artistId, event })
      );

    }
    else
      this.store.dispatch(
        updateArtistEvent({
          artistId: this.artistId,
          eventId: this.eventId,
          event,
        })
      );


  };

  back = () => {
    this.location.back();
  };
}
