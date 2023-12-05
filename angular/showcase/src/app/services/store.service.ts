import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private criteriaSource = new BehaviorSubject<string>('');
  private modalsState = new Map<string, boolean>([]);

  criteria$ = this.criteriaSource.asObservable();

  setCriteria(newCriteria: string) {
    this.criteriaSource.next(newCriteria);
  }

  isModalVisible(token: string): boolean {
    return this.modalsState.get(token) || false;
  }

  toggleModal(token: string) {
    const currentState = this.modalsState.get(token) || false;
    this.modalsState.set(token, !currentState);
  }
}