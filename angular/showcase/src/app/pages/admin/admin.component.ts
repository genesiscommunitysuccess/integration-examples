import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersColumnConfig } from '@genesislcap/foundation-entity-management';
import { EntityManagement } from '@genesislcap/foundation-entity-management';

EntityManagement;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminComponent {
  @ViewChild('entityManagement') entityManagementElement!: any;

  userColumns = [
    ...UsersColumnConfig,
    {
      field: 'ACCESS_TYPE',
      headerName: 'Access Type',
    },
  ];

  readEntity () {
    const event = new CustomEvent('read-entity');
    this.entityManagementElement.nativeElement.dispatchEvent(event);
  }
}
