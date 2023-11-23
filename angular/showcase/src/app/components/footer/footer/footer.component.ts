import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import genesisLogo from '../../../../assets/logo-icon--light.svg';
import angularLogo from '../../../../assets/angular-icon.svg';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  genesisImageUrl = genesisLogo;
  angularImageUrl = angularLogo;
}
