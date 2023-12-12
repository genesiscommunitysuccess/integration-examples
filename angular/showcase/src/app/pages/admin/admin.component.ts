import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersColumnConfig } from '@genesislcap/foundation-entity-management';

@Component({
  selector: 'app-page-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminComponent {
  @ViewChild('entityManagement') entityManagementElement!: ElementRef;
  @ViewChild('adminLayout') adminLayoutElement!: ElementRef;

  private _layoutPaneCount = 0;

  userColumns = [
    ...UsersColumnConfig,
    {
      field: 'ACCESS_TYPE',
      headerName: 'Access Type',
    },
  ];

  readEntity() {
    const event = new CustomEvent('read-entity');
    this.entityManagementElement.nativeElement.dispatchEvent(event);
  }

  addItem(registration: string) {
    this.adminLayoutElement.nativeElement.addItem({
      registration,
      title: `${registration} (${(this._layoutPaneCount += 1)})`,
      closable: true,
    });
  }
}
