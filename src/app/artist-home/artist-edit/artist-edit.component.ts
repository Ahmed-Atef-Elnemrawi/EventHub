import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserProfile } from 'src/app/user/models';
import { userSelectors } from 'src/app/user/state';
import { ArtistForManipulationDto } from '../models';
import { getCurrentArtist, getError } from '../state';
import {  updateArtist } from '../state/actions/artist-api-actions';
import { State } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArtistEditComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  backendError$!: Observable<string>;
  profile!: UserProfile;
  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private location: Location
  ) {}
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      jobTitle: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      facebook: '',
      twitter: '',
      linkedIn: '',
    });

    this.store
      .select(getCurrentArtist)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.editForm.setValue({
          jobTitle: value.JobTitle,
          bio: value.Bio,
          facebook: value.Facebook,
          twitter: value.Twitter,
          linkedIn: value.LinkedIn,
        });
      });

    this.store
      .select(userSelectors.getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.profile = value!;
      });
  }

  submit = () => {
    let artistPageId = localStorage.getItem('entityId')!;

    if (this.editForm.valid && this.editForm.value) {
      var artist: ArtistForManipulationDto = {
        ...this.editForm.value,
        ...this.profile,
      };

      this.store.dispatch(updateArtist({ artist, artistId:artistPageId }));
      // this.store.dispatch(loadArtist({ id: artistPageId }));
      this.backendError$ = this.store.select(getError);

    }
  };

  back = () => this.location.back();
}
