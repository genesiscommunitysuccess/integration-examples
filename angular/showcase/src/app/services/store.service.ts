import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const DEFAULT_CRITERIA = 'NAME != null';
export const DEFAULT_RESOURCE_NAME = 'ALL_COUNTERPARTYS';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private criteriaSource = new BehaviorSubject<string>(DEFAULT_CRITERIA);
  private resourceNameSource = new BehaviorSubject<string>(DEFAULT_RESOURCE_NAME);
  private layersState = new Map<string, BehaviorSubject<boolean>>();

  criteria = this.criteriaSource.asObservable();
  resourceName = this.resourceNameSource.asObservable();

  setCriteria(newCriteria: string) {
    this.criteriaSource.next(newCriteria);
  }

  getCriteria(): Observable<string> {
    return this.criteriaSource.asObservable();
  }

  setResourceName(newResourceName: string) {
    this.resourceNameSource.next(newResourceName);
  }

  getResourceName(): Observable<string> {
    return this.resourceNameSource.asObservable();
  }

  setLayerState(layerName: string, state: boolean) {
    const currentState = this.layersState.get(layerName) ||  new BehaviorSubject<boolean>(false);
    currentState.next(state)
    this.layersState.set(layerName, currentState);
  }

  getLayerState(layerName: string): Observable<boolean> {
    const currentState = this.layersState.get(layerName);
    
    if (currentState) {
      return currentState.asObservable();
    }

    const newObservable = new BehaviorSubject<boolean>(false);
    this.layersState.set(layerName, newObservable);

    return newObservable.asObservable();
  }
}
