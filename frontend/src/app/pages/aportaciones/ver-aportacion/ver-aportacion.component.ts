import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { AportacionesService } from '../../../services/aportaciones.service'; // To be created
// import { IAportacion } from '../../../../../../types/i-aportacion'; // To be created
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';

@Component({
  selector: 'app-ver-aportacion',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    PageLoaderComponent,
    RouterLink
  ],
  templateUrl: './ver-aportacion.component.html',
  styleUrl: './ver-aportacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerAportacionComponent implements OnInit {
  // private service = inject(AportacionesService); // To be created
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private id = this.route.snapshot.paramMap.get('id')!;
  aportacion?: any; // Using any until IAportacion is defined
  isLoading = true;

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state && navigation?.extras?.state['aportacion']) {
      this.aportacion = navigation.extras.state['aportacion'];
      // Add mock audit dates if not present
      this.aportacion.createdAt = this.aportacion.createdAt || new Date();
      this.aportacion.updatedAt = this.aportacion.updatedAt || new Date();
      this.isLoading = false;
      this.cdr.markForCheck();
    } else {
      this.getAportacion(this.id);
    }
  }

  private getAportacion(id: string): void {
    this.isLoading = true;
    // Mock service call
    console.log('Mock: Getting aportacion for view', id);
    setTimeout(() => {
      this.aportacion = {
        id: id,
        concepto: 'Cuota de Mantenimiento ' + id,
        monto: 120.75,
        fecha: new Date(2025, 3, 15),
        tipo: 'Ordinaria',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 5)
      };
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 1000);

    // this.service.getAportacion(id).subscribe({ // Uncomment when service is ready
    //   next: aportacion => {
    //     this.aportacion = aportacion;
    //     this.isLoading = false;
    //     this.cdr.markForCheck();
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //     this.cdr.markForCheck();
    //     // Handle error, e.g., navigate to list or show a message
    //   }
    // });
  }
}
