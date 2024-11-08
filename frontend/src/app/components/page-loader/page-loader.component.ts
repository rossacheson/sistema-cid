import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoaderComponent {
}
