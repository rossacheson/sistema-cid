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
import { MatButtonModule } from '@angular/material/button';
import { PersonasService } from '../../../services/personas.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IPersona } from '../../../../../../types/i-persona';

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
    MatHeaderCellDef,
    MatButtonModule
  ],
  templateUrl: './personas-lista.component.html',
  styleUrl: './personas-lista.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonasListaComponent implements OnInit {
  personasService = inject(PersonasService);
  private router = inject(Router);

  isLoading = signal(true);
  displayedColumns: string[] = ['nombre', 'apellidos', 'sexo'];
  personas = signal<IPersona[]>([]);

  ngOnInit() {
    this.personasService.getPersonas().subscribe({
      next: personas => {
        this.personas.set(personas);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  goToPersona(persona: IPersona): void {
    this.router.navigate([`/personas/ver/${persona.id}`], {state: {persona}});
  }
}
