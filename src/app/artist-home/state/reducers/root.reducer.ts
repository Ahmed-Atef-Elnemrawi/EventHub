import { ActionReducerMap, combineReducers } from "@ngrx/store";
import { ArtistState, artistReducer} from "./artist.reducer";
import { EventState, eventReducer } from "./artist-event.reducer";
import * as AppState from "src/app/state/app.state";


export interface State extends AppState.State{
  artistAndEventState: ArtistAndEventState
}

export interface ArtistAndEventState{
  artistState: ArtistState,
  eventState: EventState
}

const reducers:ActionReducerMap<ArtistAndEventState> = {
  artistState: artistReducer,
  eventState: eventReducer
}

export const artistAndEventReducer = combineReducers(reducers);
