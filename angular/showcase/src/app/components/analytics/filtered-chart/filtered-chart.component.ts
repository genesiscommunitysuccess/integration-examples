import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaSegmentedControl } from '@genesislcap/foundation-criteria';

CriteriaSegmentedControl;

@Component({
  selector: 'app-filtered-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtered-chart.component.html',
  styleUrl: './filtered-chart.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilteredChartComponent implements AfterViewInit {
  @ViewChild('criteriaSegmentedControl') criteriaSegmentedControlElement!: any;
  @Input() toolbarOptions: any;
  @Input() pieConfig: any;

  criteriaFilter = [{ label: Math.random(), value: 'VOD' }];

  getRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  generateRandomItems(count: number) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(this.getRandomString(5));
    }
    return items;
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit() {
    setInterval(() => {
      const randomInt = this.getRandomInt(1, 9);
      const items = this.generateRandomItems(randomInt).map((item) => ({
        label: item,
        value: item,
      }));

      console.log('ngAfterViewInit', { items });
      const element = this.criteriaSegmentedControlElement.nativeElement;
      element.criteriaOptions = items;
    }, 1000);
  }
}
