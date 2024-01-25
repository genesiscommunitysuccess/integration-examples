import {
  provideDesignSystem as provideZeroDesignSystem,
  baseComponents as zeroBaseComponents,
} from '@genesislcap/foundation-zero';
import { Navigation } from '@genesislcap/foundation-header';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { zeroGridTabulatorComponents } from '@genesislcap/foundation-zero-grid-tabulator';
import {
  EntityManagement,
  Profiles,
} from '@genesislcap/foundation-entity-management';
import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
import { Reporting } from '@genesislcap/foundation-reporting';
import { FoundationAlerts } from '@genesislcap/foundation-alerts';
import { SlottedStyles } from '@genesislcap/foundation-utils';
import { FoundationInbox } from '@genesislcap/foundation-inbox';
import { Filters } from '@genesislcap/foundation-forms';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { NotificationDashboard } from '@genesislcap/foundation-notification-dashboard';
import {
  fastButton,
  provideFASTDesignSystem,
} from '@microsoft/fast-components';
import { foundationLayoutComponents } from '@genesislcap/foundation-layout';
import './foundationAuth';

Navigation;
EntityManagement;
Profiles;
Reporting;
FoundationAlerts;
SlottedStyles;
FoundationInbox;
Filters;
NotificationDashboard;

provideZeroDesignSystem().register(
  zeroBaseComponents,
  zeroGridComponents,
  zeroGridTabulatorComponents,
  g2plotChartsComponents,
  foundationLayoutComponents,
);

// @todo workaround - check
provideFASTDesignSystem().register(fastButton());

// bug with grid-pro-server-datasource
ModuleRegistry.registerModules([RowGroupingModule, ServerSideRowModelModule]);
