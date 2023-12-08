import {
  provideDesignSystem as provideZeroDesignSystem,
  baseComponents as zeroBaseComponents,
} from '@genesislcap/foundation-zero';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { zeroGridTabulatorComponents } from '@genesislcap/foundation-zero-grid-tabulator';
import { EntityManagement, Profiles } from '@genesislcap/foundation-entity-management';
import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
import { Reporting } from '@genesislcap/foundation-reporting';
import { FoundationAlerts } from '@genesislcap/foundation-alerts';
import { FoundationInbox } from '@genesislcap/foundation-inbox';
import { SlottedStyles } from '@genesislcap/foundation-utils';

import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

EntityManagement;
Profiles;
Reporting;
FoundationAlerts;
FoundationInbox;
SlottedStyles;

provideZeroDesignSystem().register(
  zeroBaseComponents,
  zeroGridComponents,
  zeroGridTabulatorComponents,
  g2plotChartsComponents,
);

// bug with grid-pro-server-datasource
ModuleRegistry.registerModules([RowGroupingModule, ServerSideRowModelModule]);
