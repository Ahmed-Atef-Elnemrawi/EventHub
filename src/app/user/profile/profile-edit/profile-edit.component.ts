import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { State } from 'src/app/state/state';
import { updateProfileValidationMessages, UserProfile } from '../../models';
import { getUserId, getUserProfile } from '../../state';
import { UserApiActions } from '../../state/actions';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { Country, CountryCodes } from 'src/app/shared/models/country-codes';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, AfterViewInit, OnDestroy {
  userProfile!: Observable<UserProfile>;
  userId!: string;
  editForm!: FormGroup;
  validator!: GenericValidator;
  filteredCountries$!: Observable<Country[]> | undefined;
  countryCode$!: Observable<string> | undefined;
  backendError$!: Observable<string>;

  private destroyed$ = new Subject<void>();

  private errorMessageSubject = new Subject<{ [key: string]: string }>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    public dialog: MatDialog,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.validator = new GenericValidator(updateProfileValidationMessages);
  }

  ngAfterViewInit(): void {
    this.editForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.errorMessageSubject.next(
          this.validator.processMessages(this.editForm)
        );
      });

    this.filteredCountries$ = this.editForm.get('liveIn')?.valueChanges.pipe(
      map((val: string) =>
        CountryCodes.filter((country) =>
          country.name.toLowerCase().startsWith(val)
        )
      ),
      takeUntil(this.destroyed$)
    );

    this.editForm
      .get('liveIn')
      ?.valueChanges.pipe(
        map((val) => CountryCodes.filter((c) => c.name === val).shift()),
        takeUntil(this.destroyed$)
      )
      .subscribe((val) =>
        this.editForm.patchValue({
          phoneGroup: { countryCode: val?.dial_code },
        })
      );
  }

  ngOnInit(): void {
    this.userProfile = this.store.select(getUserProfile);
    this.store
      .select(getUserId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id) => (this.userId = id));

    this.editForm = this.fb.group({
      picture: '',
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-z]*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-z]*$/),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[A-z0-9]*$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      phoneGroup: this.fb.group({
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        countryCode: '',
      }),
      age: [
        0,
        [
          Validators.required,
          Validators.min(11),
          Validators.max(80),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      genre: ['', [Validators.required]],
      liveIn: ['', Validators.required],
    });

    this.userProfile.subscribe((info) => {
      this.editForm.patchValue({
        ...info,
        liveIn: info.country,
        genre: info.genre.toString(),
      });

      this.editForm.get('phoneGroup')?.patchValue({
        phoneNumber: info.phoneNumber?.slice(-10),
        countryCode: info.phoneNumber?.slice(0, info.phoneNumber.length - 10),
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit() {
    if (this.editForm.value && this.editForm.valid && this.editForm.dirty) {
      const phoneGroup = this.editForm.get('phoneGroup');
      const code = phoneGroup?.get('countryCode')?.value;
      const phoneNumber = phoneGroup?.get('phoneNumber')?.value;

      let userProfileForUpdate: UserProfile = {
        ...this.editForm.value,
        country: this.editForm.get('liveIn')?.value,
        genre: +this.editForm.get('genre')?.value,
        phoneNumber: code + phoneNumber,
      };

      this.store.dispatch(
        UserApiActions.updateUserProfile({
          userProfile: userProfileForUpdate,
          userId: this.userId,
        })
      );
    }
  }
}
