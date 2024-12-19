import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonasComponent {

}
