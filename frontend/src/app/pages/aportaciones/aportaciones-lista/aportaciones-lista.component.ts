import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AportacionesService } from '../../../services/aportaciones.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IAportacion } from '../../../../../../types/i-aportacion';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-aportaciones-lista',
  standalone: true,
  imports: [
    RouterLink,
    PageLoaderComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatAutocompleteModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './aportaciones-lista.component.html',
  styleUrl: './aportaciones-lista.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AportacionesListaComponent implements OnInit {
  aportacionesService = inject(AportacionesService);
  private router = inject(Router);

  isLoading = signal(true);
  displayedColumns: string[] = ['persona', 'concepto', 'monto', 'fecha'];
  aportaciones = signal<IAportacion[]>([]);

  ngOnInit() {

    this.aportacionesService.getAportaciones().subscribe({
      next: aportaciones => {
        this.aportaciones.set(aportaciones);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  goToAportacion(aportacion: IAportacion): void {
    this.router.navigate([`/aportaciones/ver/${aportacion.id}`], {state: {aportacion}});
  }
}
