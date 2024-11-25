import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonasService } from '../../../services/personas.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IIndividuo } from '../../../../../../types/i-individuo';
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

@Component({
  selector: 'app-personas-lista',
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
    MatHeaderCellDef
  ],
  templateUrl: './personas-lista.component.html',
  styleUrl: './personas-lista.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonasListaComponent implements OnInit {
  personasService = inject(PersonasService);
  private cdr = inject(ChangeDetectorRef);

  isLoading = true;
  displayedColumns: string[] = ['nombre', 'apellidos', 'sexo'];
  personas: IIndividuo[] = [];

  ngOnInit() {
    this.personasService.getPersonas().subscribe(personas => {
      // check if personas is an array
      if (Array.isArray(personas)) {
        this.personas = personas;
      } else {
        console.error('Malformed response: ', personas);
      }

      this.isLoading = false;
      this.cdr.markForCheck();
    })
  }
}
