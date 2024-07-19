import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
import * as rapidDesignSystem from '@genesislcap/rapid-design-system';
import { foundationLayoutComponents } from '@genesislcap/foundation-layout';

rapidDesignSystem
 .provideDesignSystem()
 .register(
     rapidDesignSystem.baseComponents,
     g2plotChartsComponents,
     foundationLayoutComponents,
 );
