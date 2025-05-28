import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aportaciones',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './aportaciones.component.html',
  styleUrl: './aportaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AportacionesComponent {

}
