import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GridProClientDatasourceComponent } from '../../components/protected/grid-pro-client-datasource/grid-pro-client-datasource.component';
import { provideDesignSystem } from '@genesislcap/foundation-zero';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';

provideDesignSystem().register(zeroGridComponents);
@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [ GridProClientDatasourceComponent ],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtectedComponent {}
