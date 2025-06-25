import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AportacionesService } from '../../../services/aportaciones.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IAportacion } from '../../../../../../types/i-aportacion';
import { ConfirmacionComponent, ConfirmacionData } from '../../../components/confirmacion/confirmacion.component';
import { AuthService } from '../../../services/auth.service';
import { PersonasService } from '../../../services/personas.service';
import { IPersona } from '../../../../../../types/i-persona';

@Component({
  selector: 'app-editar-aportacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    PageLoaderComponent,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-aportacion.component.html',
  styleUrl: './editar-aportacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarAportacionComponent implements OnInit {
  router = inject(Router);
  service = inject(AportacionesService);
  personasService = inject(PersonasService);
  readonly dialog = inject(MatDialog);
  isAdmin$: Observable<boolean> = inject(AuthService).userGroups$.pipe(
    map((userGroups) => userGroups.includes('admins'))
  );
  modo!: 'agregar' | 'editar';
  isLoading = signal<boolean>(true);
  personas = signal<IPersona[]>([]);
  personaLoaded = signal<boolean>(false);
  filteredPersonas = signal<IPersona[]>([]);
  @ViewChild('personaInput') personaInput?: ElementRef<HTMLInputElement>;
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  private aportacion?: IAportacion;

  editarAportacionForm: FormGroup = new FormGroup({
    persona: new FormControl(null, Validators.required),
    concepto: new FormControl('', Validators.required),
    monto: new FormControl(null, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(10000000),
    ]),
    fecha: new FormControl(null, Validators.required),
    modoDePago: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.modo = this.router.url.includes('agregar') ? 'agregar' : 'editar';

    this.fetchPersonas();

    if (this.modo === 'editar') {
      this.getAportacion(this.id);
      this.editarAportacionForm.get('persona')?.disable();
    } else {
      this.isLoading.set(false);
    }
  }

  onSubmit() {
    if (this.editarAportacionForm.valid) {
      this.isLoading.set(true);
      const formValue = this.editarAportacionForm.getRawValue();
      console.log('Form Value:', formValue);
      const aportacion: IAportacion = {
        personaId: formValue.persona.id,
        personaNombre: this.displayPersona(formValue.persona),
        concepto: formValue.concepto,
        monto: formValue.monto,
        fecha: formValue.fecha,
        modoDePago: formValue.modoDePago,
      };
      if (this.modo === 'agregar') {
        console.log('Adding aportacion', aportacion);
        this.service.agregarAportacion(aportacion).subscribe({
          next: (result) => {
            this.router.navigate([`/aportaciones/ver/${result.id}`]);
          },
          error: (error) => {
            console.log(error);
            alert('Error en agregar la aportación');
            this.isLoading.set(false);
          },
        });
      } else {
        const updatedAportacion = {
          ...this.aportacion,
          ...formValue,
          id: this.id,
        };

        this.service.editarAportacion(updatedAportacion).subscribe({
          next: (result) => {
            this.router.navigate([`/aportaciones/ver/${updatedAportacion.id}`]);
          },
          error: error => {
            console.log(error);
            alert('Error en editar la aportación');
            this.isLoading.set(false);
          }
        });
      }
    }
  }

  confirmDeletion(): void {
    const dialogRef = this.dialog.open<ConfirmacionComponent, ConfirmacionData, boolean>(ConfirmacionComponent, {
      data: {
        title: 'Borrar Aportación',
        content: '¿Seguro que quieres borrar esta aportación? Esta acción no se puede deshacer.',
        actionButtonText: 'Borrar'
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result === true) {
        this.isLoading.set(true);
        console.log('Deleting aportacion with ID:', this.id);
        this.service.deleteAportacion(this.aportacion!.personaId, this.id).subscribe({
          next: (deleteResult: boolean) => {
            if (deleteResult) {
              this.router.navigate(['/aportaciones']);
            } else {
              console.error('Error al eliminar la aportación: la API devolvió falso.');
              this.isLoading.set(false);
            }
          },
          error: error => {
            console.error('Error en la llamada API para eliminar aportación:', error);
            this.isLoading.set(false);
          }
        });
      }
    });
  }

  displayPersona(persona: IPersona): string {
    return persona
      ? `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`
      : '';
  }

  public filterPersonas(): void {
    const filterValue = this.personaInput?.nativeElement.value;
    this.filteredPersonas.set(this._filterPersonas(filterValue || ''));
  }

  private _filterPersonas(value: string): IPersona[] {
    const filterValue = value.toLowerCase();
    if (!filterValue) {
      return this.personas();
    }
    return this.personas().filter(
      (persona) =>
        persona.nombre.toLowerCase().includes(filterValue) ||
        persona.apellidoPaterno.toLowerCase().includes(filterValue) ||
        persona.apellidoMaterno?.toLowerCase().includes(filterValue)
    );
  }

  private fetchPersonas(): void {
    this.personasService.getPersonas().subscribe({
      next: (personas) => {
        this.personas.set(personas);
        this.filterPersonas();

        if(this.modo === 'editar' && this.aportacion && !this.personaLoaded()){
          this.editarAportacionForm.get('persona')?.setValue(this.personas()
            .find(persona => persona.id === this.aportacion!.personaId));
          this.personaLoaded.set(true);
        }
      },
    });
  }

  private getAportacion(id: string): void {
    this.isLoading.set(true);
    this.service.getAportacion(id).subscribe({
      next: aportacion => {
        this.editarAportacionForm.patchValue(aportacion);
        this.aportacion = aportacion;

        if(this.personas().length > 0 && !this.personaLoaded()){
          this.editarAportacionForm.get('persona')?.setValue(this.personas().find(persona => persona.id === aportacion.personaId));
          this.personaLoaded.set(true);
        }

        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
