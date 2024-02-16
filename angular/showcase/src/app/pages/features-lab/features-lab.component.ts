import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';
import { Session } from '@genesislcap/foundation-comms';
import { Connect } from '@genesislcap/foundation-comms';
import { getErrorFormat } from '@genesislcap/foundation-entity-management';
import { UUID } from '@genesislcap/foundation-utils';
import {
  ErrorBoundaryEvent,
  getErrorBuilder,
  getNotificationBuilder,
  getErrorDialogBuilder,
  getSnackbarBuilder,
  getErrorBannerBuilder,
} from '@genesislcap/foundation-errors';

@Component({
  selector: 'app-features-lab',
  standalone: true,
  imports: [],
  templateUrl: './features-lab.component.html',
  styleUrl: './features-lab.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesLabComponent implements AfterViewInit {
  @ViewChild('environmentAlertModal') environmentAlertModalElement!: any;
  @Session session!: Session;
  @UUID private uuid!: UUID;
  private connect!: Connect;

  constructor() {}

  private defaultTestRecordName = 'Temporary Test Record';

  ngAfterViewInit(): void {
    if (this.environmentAlertModalElement.nativeElement.show) {
      this.environmentAlertModalElement.nativeElement.show();
    }
  }

  async insertTenTestRecords() {
    try {
      await this.fetchAllTestRecords();
      this.emitBanner([
        {
          CODE: 'INSERT RECORDS',
          TEXT: 'Inserted 10 random records',
        },
      ]);
      const records = [];
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers, no-plusplus
      for (let i = 0; i < 10; i++) {
        records.push(this.createTestCounterpartyRecord());
      }
      records.forEach(async (record) => {
        const submitReq = await this.connect.commitEvent('EVENT_COUNTERPARTY_INSERT', {
          DETAILS: record,
        });

        if (!submitReq || submitReq?.ERROR) {
          this.emitErrorNotification(
            submitReq?.ERROR || [
              {
                CODE: 'CONNECT ERROR',
                TEXT: 'Error inserting record',
              },
            ],
          );
        }
      });
    } catch (error) {
      this.emitErrorNotification([
        {
          CODE: 'CONNECT ERROR',
          TEXT: 'Error inserting record',
        },
      ]);
    }
  }

  private createTestCounterpartyRecord(): {
    COUNTERPARTY_ID: string;
    COUNTERPARTY_LEI: string;
    NAME: string;
    ENABLED: boolean;
  } {
    console.log({ test: this.uuid.createId() });
    return {
      COUNTERPARTY_ID: this.uuid.createId(),
      COUNTERPARTY_LEI: this.uuid.createId(),
      NAME: this.defaultTestRecordName,
      ENABLED: false,
    };
  }

  async updateAllTestRecords() {
    try {
      const allTemporaryCounterparties = await this.fetchAllTestRecords();
      allTemporaryCounterparties?.forEach(async (record) => {
        record.COUNTERPARTY_LEI = this.uuid.createId() + ' - Updated';
        delete record.DETAILS;
        const submitReq = await this.connect.commitEvent('EVENT_COUNTERPARTY_MODIFY', {
          DETAILS: record,
        });

        if (submitReq.ERROR) {
          console.error(submitReq.ERROR);
          this.emitErrorNotification(submitReq.ERROR);
        }
      });
    } catch (error: any) {
      this.emitErrorDialog([
        {
          CODE: 'CONNECT ERROR',
          TEXT: error.message,
        },
      ]);
    }
  }

  async deleteAllTestRecords() {
    try {
      const allTemporaryCounterparties = await this.fetchAllTestRecords();
      allTemporaryCounterparties?.forEach(async (record) => {
        await this.connect.commitEvent('EVENT_COUNTERPARTY_DELETE', {
          DETAILS: { COUNTERPARTY_ID: record.COUNTERPARTY_ID },
          IGNORE_WARNINGS: true,
          VALIDATE: false,
        });
      });
    } catch (error: any) {
      this.emitSnackbar([
        {
          CODE: 'CONNECT ERROR',
          TEXT: error.message,
        },
      ]);
    }
  }

  private async fetchAllTestRecords() {
    const allTemporaryCounterparties = await this.connect.snapshot('ALL_COUNTERPARTYS', {
      CRITERIA_MATCH: `NAME == '${this.defaultTestRecordName}' && (ENABLED == false || ENABLED == null)`,
    });

    return allTemporaryCounterparties.ROW;
  }

  private emitErrorNotification(error: { CODE: string; TEXT: string }[]) {
    const notificationCloseTimeout = 5000;
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withNotification(
              getNotificationBuilder()
                .withType('warning')
                .withAutoClose(true)
                .withCloseTimeout(notificationCloseTimeout)
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  }

  private emitErrorDialog(error: { CODE: string; TEXT: string }[]) {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withDialog(
              getErrorDialogBuilder()
                .withDismissingAction({ label: 'Dismiss' })
                .withConfirmingAction({ label: 'Confirm', action: () => console.log('Confirmed') })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  }

  private emitSnackbar(error: { CODE: string; TEXT: string }[]) {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withSnackbar(
              getSnackbarBuilder()
                .withType('error')
                .withConfirmingAction({ label: 'Confirm', action: () => console.log('Confirmed') })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  }

  private emitBanner(error: { CODE: string; TEXT: string }[]) {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withBanner(
              getErrorBannerBuilder()
                .withConfirmingAction({ label: 'Confirm', action: () => console.log('Confirmed') })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  }
}
