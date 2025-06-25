import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmacionData {
  title: string;
  content: string;
  actionButtonText: string;
}

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmacionComponent {
  title: string;
  content: string;
  actionButtonText: string;

  // Default values if not provided by the component that opens the dialog
  private defaultTitle = 'Confirmación';
  private defaultContent = '¿Está seguro de realizar esta acción?';
  private defaultActionButtonText = 'Aceptar';

  constructor(@Inject(MAT_DIALOG_DATA) public data?: ConfirmacionData) {
    this.title = data?.title ?? this.defaultTitle;
    this.content = data?.content ?? this.defaultContent;
    this.actionButtonText = data?.actionButtonText ?? this.defaultActionButtonText;
  }

}
