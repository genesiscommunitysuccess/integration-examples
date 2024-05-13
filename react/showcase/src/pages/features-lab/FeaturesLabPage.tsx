import { useRef, useEffect } from 'react';
import style from './FeaturesLabPage.module.css';
import { getErrorFormat } from '@genesislcap/foundation-entity-management';
import { Modal } from '@genesislcap/foundation-zero';
import { UUID } from '@genesislcap/foundation-utils';
import { Session as sessionKey } from '@genesislcap/foundation-comms';
import {
  ErrorBoundaryEvent,
  getErrorBuilder,
  getNotificationBuilder,
  getErrorDialogBuilder,
  getSnackbarBuilder,
  getErrorBannerBuilder,
} from '@genesislcap/foundation-errors';
import { connectService } from '../../services/connect.service';

UUID;

const FeaturesLabPage = () => {
  const diContainer = connectService.getContainer();
  const uuidKey = UUID;
  const uuid = diContainer.get(uuidKey);
  const session = diContainer.get(sessionKey);
  const environmentAlertModal = useRef<Modal>(null);
  const connect = connectService.getConnect();
  const defaultTestRecordName = 'Temporary Test Record';
  const fetchAllTestRecords = async () => {
    const allTemporaryCounterparties = await connect.snapshot(
      'ALL_COUNTERPARTYS',
      {
        CRITERIA_MATCH: `NAME == '${defaultTestRecordName}' && (ENABLED == false || ENABLED == null)`,
      },
    );

    return allTemporaryCounterparties.ROW;
  };

  const emitSnackbar = (error: { CODE: string; TEXT: string }[]) => {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withSnackbar(
              getSnackbarBuilder()
                .withType('error')
                .withConfirmingAction({
                  label: 'Confirm',
                  action: () => console.log('Confirmed'),
                })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  };

  const emitBanner = (error: { CODE: string; TEXT: string }[]) => {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withBanner(
              getErrorBannerBuilder()
                .withConfirmingAction({
                  label: 'Confirm',
                  action: () => console.log('Confirmed'),
                })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  };

  const emitErrorDialog = (error: { CODE: string; TEXT: string }[]) => {
    error.forEach((err) => {
      new CustomEvent(ErrorBoundaryEvent.ERROR_BOUNDARY_EVENT, {
        detail: {
          message: getErrorBuilder()
            .withTitle(err.CODE)
            .withErrorDetails(getErrorFormat(err))
            .withDialog(
              getErrorDialogBuilder()
                .withDismissingAction({ label: 'Dismiss' })
                .withConfirmingAction({
                  label: 'Confirm',
                  action: () => console.log('Confirmed'),
                })
                .build(),
            )
            .build(),
        },
        bubbles: true,
      });
    });
  };

  const emitErrorNotification = (error: { CODE: string; TEXT: string }[]) => {
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
  };

  const insertTenTestRecords = async () => {
    try {
      await fetchAllTestRecords();
      emitBanner([
        {
          CODE: 'INSERT RECORDS',
          TEXT: 'Inserted 10 random records',
        },
      ]);
      const records = [];
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers, no-plusplus
      for (let i = 0; i < 10; i++) {
        records.push(createTestCounterpartyRecord());
      }
      records.forEach(async (record) => {
        const submitReq = await connect.commitEvent(
          'EVENT_COUNTERPARTY_INSERT',
          {
            DETAILS: record,
          },
        );

        if (!submitReq || submitReq?.ERROR) {
          emitErrorNotification(
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
      emitErrorNotification([
        {
          CODE: 'CONNECT ERROR',
          TEXT: 'Error inserting record',
        },
      ]);
    }
  };

  const createTestCounterpartyRecord = (): {
    COUNTERPARTY_ID: string;
    COUNTERPARTY_LEI: string;
    NAME: string;
    ENABLED: boolean;
  } => {
    return {
      COUNTERPARTY_ID: uuid.createId(),
      COUNTERPARTY_LEI: uuid.createId(),
      NAME: defaultTestRecordName,
      ENABLED: false,
    };
  };

  const updateAllTestRecords = async () => {
    try {
      const allTemporaryCounterparties = await fetchAllTestRecords();
      allTemporaryCounterparties?.forEach(async (record) => {
        record.COUNTERPARTY_LEI = uuid.createId() + ' - Updated';
        delete record.DETAILS;
        const submitReq = await connect.commitEvent(
          'EVENT_COUNTERPARTY_MODIFY',
          {
            DETAILS: record,
          },
        );

        if (submitReq.ERROR) {
          console.error(submitReq.ERROR);
          emitErrorNotification(submitReq.ERROR);
        }
      });
    } catch (error: any) {
      emitErrorDialog([
        {
          CODE: 'CONNECT ERROR',
          TEXT: error.message,
        },
      ]);
    }
  };

  const deleteAllTestRecords = async () => {
    try {
      const allTemporaryCounterparties = await fetchAllTestRecords();
      allTemporaryCounterparties?.forEach(async (record: any) => {
        await connect.commitEvent('EVENT_COUNTERPARTY_DELETE', {
          DETAILS: { COUNTERPARTY_ID: record.COUNTERPARTY_ID },
          IGNORE_WARNINGS: true,
          VALIDATE: false,
        });
      });
    } catch (error: any) {
      emitSnackbar([
        {
          CODE: 'CONNECT ERROR',
          TEXT: error.message,
        },
      ]);
    }
  };

  useEffect(() => {
    if (environmentAlertModal.current) {
      environmentAlertModal.current.show();
    }
  }, []);

  return (
    <zero-notification-listener class={style['page-features-lab']}>
      <div className={style['wrapper']}>
        <zero-toolbar>
          <zero-button on-click={insertTenTestRecords}>
            Add 10 Random Test Records
          </zero-button>
          <zero-button on-click={updateAllTestRecords}>
            Update All Test Records
          </zero-button>
          <zero-button on-click={deleteAllTestRecords}>
            Delete All Test Records
          </zero-button>
        </zero-toolbar>
        <zero-divider></zero-divider>
        <entity-management
          persist-column-state-key="grid-ctpy-features-lab"
          resourceName="ALL_COUNTERPARTYS"
          title="Counterparty Management"
          updateEvent="EVENT_COUNTERPARTY_MODIFY"
          deleteEvent="EVENT_COUNTERPARTY_DELETE"
          createEvent="EVENT_COUNTERPARTY_INSERT"
        ></entity-management>
        <zero-divider></zero-divider>
        <entity-management
          resourceName="ALL_COUNTERPARTYS"
          title="All Counterparties"
        ></entity-management>

        <zero-modal ref={environmentAlertModal}>
          <h4 style={{ justifyContent: 'center' }} slot="top">
            ⚠️ Changes made here are final.
          </h4>
          <p>
            🖥️ You&apos;re connected to
            <b style={{ color: 'var(--accent-fill-rest)' }}>
              {session.getSessionStorageItem('hostUrl')}
            </b>
            , make sure it&apos;s a
            <b style={{ color: 'var(--accent-fill-rest)' }}>development</b>
            server.
          </p>
        </zero-modal>
      </div>
    </zero-notification-listener>
  );
};

export default FeaturesLabPage;
