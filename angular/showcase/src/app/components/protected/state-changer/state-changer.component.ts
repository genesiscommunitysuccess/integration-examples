import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, DEFAULT_CRITERIA, DEFAULT_RESOURCE_NAME } from '../../../services/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-state-changer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './state-changer.component.html',
  styleUrl: './state-changer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StateChangerComponent implements OnInit {
  criteria: string = DEFAULT_CRITERIA;
  resourceName: string = DEFAULT_RESOURCE_NAME;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.getCriteria().subscribe((newCriteria) => {
      console.log({ newCriteria });
      this.criteria = newCriteria;
    });

    this.store.getResourceName().subscribe((newResourceName) => {
      this.resourceName = newResourceName;
    });
  }

  updateCriteria() {
    this.store.setCriteria(this.criteria);
  }

  updateResourceName() {
    this.store.setResourceName(this.resourceName);
  }
}
