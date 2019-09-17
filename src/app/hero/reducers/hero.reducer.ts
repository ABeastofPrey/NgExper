import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Hero } from '../models/hero.model';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';

export const heroesFeatureKey = 'heroes';

export function selectHeroId(a: Hero): string {
  return a.id;
}

export function sortByName(a: Hero, b: Hero): number {
  return a.name.localeCompare(b.name);
}

export interface State extends EntityState<Hero> {
  // additional entities state properties
  selectedHeroId: string | null;
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>({
  selectId: selectHeroId,
  sortComparer: sortByName
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedHeroId: null,
});

export function reducer(
  state = initialState,
  action: HeroActions
): State {
  switch (action.type) {
    case HeroActionTypes.AddHero: {
      return adapter.addOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpsertHero: {
      return adapter.upsertOne(action.payload.hero, state);
    }

    case HeroActionTypes.AddHeros: {
      return adapter.addMany(action.payload.heros, state);
    }

    case HeroActionTypes.UpsertHeros: {
      return adapter.upsertMany(action.payload.heros, state);
    }

    case HeroActionTypes.UpdateHero: {
      return adapter.updateOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpdateHeros: {
      return adapter.updateMany(action.payload.heros, state);
    }

    case HeroActionTypes.DeleteHero: {
      return adapter.removeOne(action.payload.id, state);
    }

    case HeroActionTypes.DeleteHeros: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case HeroActionTypes.LoadHeros: {
      return adapter.addAll(action.payload.heros, state);
    }

    case HeroActionTypes.ClearHeros: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getSelectedHeroId = (state: State) => state.selectedHeroId;
