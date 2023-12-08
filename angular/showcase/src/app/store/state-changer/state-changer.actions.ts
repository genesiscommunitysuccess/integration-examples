import { createAction, props } from '@ngrx/store';

export const setCriteria = createAction(
  '[State changer] Set criteria',
  props<{ criteria: string }>()
);

export const setResourceName = createAction(
  '[State changer] Set resource name',
  props<{ resourceName: string }>()
);
