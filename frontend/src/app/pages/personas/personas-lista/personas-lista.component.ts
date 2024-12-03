import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { PersonasService } from '../../../services/personas.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IIndividuo } from '../../../../../../types/i-individuo';

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
  private router = inject(Router);

  isLoading = true;
  displayedColumns: string[] = ['nombre', 'apellidos', 'sexo'];
  personas: IIndividuo[] = [];

  ngOnInit() {
    this.personasService.getPersonas().subscribe({
      next: personas => {
        this.personas = personas;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goToPersona(persona: IIndividuo): void {
    this.router.navigate([`/personas/ver/${persona.id}`], {state: {persona}});
  }
}
