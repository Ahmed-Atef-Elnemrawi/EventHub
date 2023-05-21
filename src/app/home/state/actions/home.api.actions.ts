import { createAction, props } from "@ngrx/store";
import { ShapedEntity } from "../../models";


export const loadLatestArtists = createAction(
  '[Home] load latest artists',
  props<{pageSize:number}>()
);

export const loadLatestArtistsSuccess = createAction(
  '[Home] load latest artist success',
  props<{artists: any}>()
);

export const loadLatestArtistsFailure = createAction(
  '[Home] load latest artist failed',
  props<{error: string}>()
);

export const loadLatestEvents = createAction(
  '[Home] load latest events',
  props<{pageSize:number}>()
);

export const loadLatestEventsSuccess = createAction(
  '[Home] load latest events success',
  props<{events: any}>()
);

export const loadLatestEventsFailure = createAction(
  '[Home] load latest events failed',
  props<{error:string}>()
);

export const loadMoreArtists = createAction(
  '[Home] load more artists',
  props<{incrementBy:number}>()
)

export const loadMoreEvents = createAction(
  '[Home] load more events',
  props<{incrementBy: number}>()
)

export const loadCurrentDayEvent = createAction(
  '[Home] load current day events',
  props<{userId: string}>()
)


export const loadCurrentDayEventSuccess = createAction(
  '[Home] load current day events success',
  props<{currentDayEvents:ShapedEntity[]}>()
)
export const loadCurrentDayEventFailure = createAction(
  '[Home] load current day events failed',
  props<{error:string}>()
)

