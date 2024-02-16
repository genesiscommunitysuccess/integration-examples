import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getCriteriaBuilder, INPUT_MIN_LENGTH } from '@genesislcap/foundation-ui';
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

  searchConfig = [
    {
      field: 'COUNTERPARTY_ID',
      label: (searchTerm: any) => `${searchTerm} as Counterparty ID`,
      createCriteria: getCriteriaBuilder,
      isEnabled: (searchTerm: string | any[], selectedOption: any[]) => {
        return (
          searchTerm.length >= INPUT_MIN_LENGTH &&
          !selectedOption.some((e) => e.field === 'COUNTERPARTY_ID')
        );
      },
    },
    {
      field: 'NAME',
      label: (searchTerm: any) => `${searchTerm} as Name`,
      createCriteria: getCriteriaBuilder,
      isEnabled: (searchTerm: string | any[], selectedOption: any[]) => {
        return (
          searchTerm.length >= INPUT_MIN_LENGTH && !selectedOption.some((e) => e.field === 'NAME')
        );
      },
    },
    {
      field: 'COUNTERPARTY_LEI',
      label: (searchTerm: any) => `${searchTerm} as COUNTERPARTY_LEI`,
      createCriteria: getCriteriaBuilder,
      isEnabled: (searchTerm: string | any[], selectedOption: any[]) => {
        return (
          searchTerm.length >= INPUT_MIN_LENGTH &&
          !selectedOption.some((e) => e.field === 'COUNTERPARTY_LEI')
        );
      },
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
