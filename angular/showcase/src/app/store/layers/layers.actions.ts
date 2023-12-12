import { createAction, props } from '@ngrx/store';

export const showLayer = createAction('[Layers] Show Layer', props<{ layerName: string }>());

export const hideLayer = createAction('[Layers] Hide Layer', props<{ layerName: string }>());
