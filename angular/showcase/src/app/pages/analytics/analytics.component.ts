import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideDesignSystem } from '@genesislcap/foundation-zero';
import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
import {
  FoundationLayout,
  FoundationLayoutItem,
} from '@genesislcap/foundation-layout';
import * as SavedLayout from '../../../sample-data/saved-layouts';
import {
  areaConfiguration,
  barConfiguration,
  barData,
  columnConfiguration,
  dualaxesConfiguration,
  dualaxesData,
  lineConfiguration,
  pieConfiguration,
  pieData,
  roseConfiguration,
  roseData,
  stockConfiguration,
  stockData,
  mixConfiguration,
} from '../../../sample-data';

provideDesignSystem().register(g2plotChartsComponents);

const layoutSaveKey = 'analytics-layout-save-key';

type SavedLayoutsType = typeof SavedLayout;
type SavedLayoutKeys = keyof SavedLayoutsType;

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AnalyticsComponent {
  @ViewChild('analyticsLayout') analyticsLayoutElement!: any;

  areaConfig = areaConfiguration;
  barConfig = barConfiguration;
  barData = barData;
  lineConfig = lineConfiguration;
  pieConfig = pieConfiguration;
  pieData = pieData;
  roseConfig = roseConfiguration;
  roseData = roseData;
  stockConfig = stockConfiguration;
  stockData = stockData;
  columnConfig = columnConfiguration;
  dualaxesConfig = dualaxesConfiguration;
  dualaxesData = dualaxesData;
  mixConfig = mixConfiguration;

  private upadateRibbonButtons() {
    const currentlyAddedItem = FoundationLayout.layoutRequiredRegistrations(
      this.analyticsLayoutElement.getLayout(),
    );
    // const registeredItems = Array.from(this.shadowRoot.querySelectorAll('zero-layout-item')).map(
    //   (node: FoundationLayoutItem) => ({ registration: node.registration, title: node.title }),
    // );

    // this.ribbonButtonsConfig = registeredItems.map((item) => ({
    //   ...item,
    //   enabled: !currentlyAddedItem.includes(item.registration),
    // }));
  }

  saveLayoutButtonHandler() {
    const layout = this.analyticsLayoutElement.getLayout();
    localStorage.setItem(layoutSaveKey, JSON.stringify(layout));
  }

  loadLayoutButtonHandler() {
    const layout = localStorage.getItem(layoutSaveKey);
    if (!layout) return;
    this.analyticsLayoutElement.loadLayout(JSON.parse(layout));
  }

  loadPredefinedLayout(layoutName: SavedLayoutKeys) {
    this.analyticsLayoutElement.loadLayout(JSON.parse(SavedLayout[layoutName]));
    this.upadateRibbonButtons();
  }

  // Rose charts already have this as the default parser, but leaving as an example
  roseLegendParser = () => ({ series }: { series: string }) => series;
}
