import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
import * as rapidDesignSystem from '@genesislcap/rapid-design-system';

rapidDesignSystem
 .provideDesignSystem()
 .register(
     rapidDesignSystem.baseComponents,
     g2plotChartsComponents,
 );
