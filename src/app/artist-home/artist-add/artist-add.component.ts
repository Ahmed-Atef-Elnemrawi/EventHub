import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserProfile, PageType } from 'src/app/user/models';
import { updateUserProfile } from 'src/app/user/state/actions/user-api.actions';
import { ArtistForManipulationDto } from '../models';
import { getArtistId } from '../state';
import { createArtist } from '../state/actions/artist-api-actions';
import { userSelectors } from 'src/app/user/state';
import { State } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArtistAddComponent implements OnInit, OnDestroy {
  addForm!: FormGroup;
  currentUser!: UserProfile | null;
  currentUserId!: string;
  currentArtistId!: string;
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      facebook: '',
      twitter: '',
      linkedIn: '',
    });

    this.store
      .select(userSelectors.getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => (this.currentUser = user));

    this.store
      .select(userSelectors.getUserId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id) => (this.currentUserId = id));

    this.store
      .select(getArtistId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id) => (this.currentArtistId = id));
  }

  onSubmit() {
    let artist: ArtistForManipulationDto = {
      firstName: this.currentUser?.firstName,
      lastName: this.currentUser?.lastName,
      age: this.currentUser?.age,
      liveIn: this.currentUser?.liveIn,
      email: this.currentUser?.email,
      genre: this.currentUser?.genre,
      phoneNumber: this.currentUser?.phoneNumber,
      ...this.addForm.value,
    };

    this.store.dispatch(createArtist({ artist }));

    this.store.dispatch(
      updateUserProfile({
        userProfile: {
          ...this.currentUser!,
          userPage: {
            entityId: localStorage.getItem('artistId')!,
            type: PageType.artist,
          },
        },
        userId: this.currentUserId,
      })
    );
  }
}
