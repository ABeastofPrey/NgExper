import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';

import * as fromHero from '../reducers/hero.reducer';

// export interface State {
//     heroes: fromHero.State,
// }

// export const reducers: ActionReducerMap<State> = {
//     heroes: fromHero.reducer,
// };

export const selectHeroState = createFeatureSelector<fromHero.State>(fromHero.heroesFeatureKey);

export const selectHeroIds = createSelector(selectHeroState, fromHero.selectIds);

export const selectHeroEntities = createSelector(selectHeroState, fromHero.selectEntities);

export const selectAllHeroes = createSelector(selectHeroState, fromHero.selectAll);

export const selectHeroTotal = createSelector(selectHeroState, fromHero.selectTotal);

export const selectCurrentHeroId = createSelector(selectHeroState, fromHero.getSelectedHeroId);

export const selectCurrentHero = createSelector(
    selectHeroEntities,
    selectCurrentHeroId,
    (heroEntities, heroId) => heroEntities[heroId]
);
