import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-borrar-confirmacion',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './borrar-confirmacion.component.html',
  styleUrl: './borrar-confirmacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorrarConfirmacionComponent {

}
