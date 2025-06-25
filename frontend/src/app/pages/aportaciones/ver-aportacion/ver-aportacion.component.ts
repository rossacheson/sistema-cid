import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AportacionesService } from '../../../services/aportaciones.service';
import { IAportacion } from '../../../../../../types/i-aportacion';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ver-aportacion',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    PageLoaderComponent,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './ver-aportacion.component.html',
  styleUrl: './ver-aportacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerAportacionComponent implements OnInit {
  private service = inject(AportacionesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id = this.route.snapshot.paramMap.get('id')!;
  aportacion = signal<IAportacion | undefined>(undefined);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state && navigation?.extras?.state['aportacion']) {
      this.aportacion.set(navigation.extras.state['aportacion']);
      this.isLoading.set(false);
    } else {
      this.getAportacion(this.id);
    }
  }

  private getAportacion(id: string): void {
    this.isLoading.set(true);
    this.service.getAportacion(id).subscribe({
      next: aportacion => {
        this.aportacion.set(aportacion);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
