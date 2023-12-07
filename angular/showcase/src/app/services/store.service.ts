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
  private modalsState = new Map<string, boolean>([]);

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

  isModalVisible(token: string): boolean {
    return this.modalsState.get(token) || false;
  }

  toggleModal(token: string) {
    const currentState = this.modalsState.get(token) || false;
    this.modalsState.set(token, !currentState);
  }
}
