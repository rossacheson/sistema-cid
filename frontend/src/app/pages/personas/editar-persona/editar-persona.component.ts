import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { map, Observable } from 'rxjs';
import { PersonasService } from '../../../services/personas.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IPersona } from '../../../../../../types/i-persona';
import { ConfirmacionComponent, ConfirmacionData } from '../../../components/confirmacion/confirmacion.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-editar-persona',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    PageLoaderComponent,
    AsyncPipe
  ],
  templateUrl: './editar-persona.component.html',
  styleUrl: './editar-persona.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPersonaComponent implements OnInit {
  router = inject(Router);
  service = inject(PersonasService);
  readonly dialog = inject(MatDialog);
  isAdmin$: Observable<boolean> = inject(AuthService).userGroups$.pipe(
    map(userGroups => userGroups.includes('admins')),
  );
  modo!: 'agregar' | 'editar';
  isLoading = signal<boolean>(true);
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  private persona?: IPersona;

  editarPersonaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidoPaterno: new FormControl('', Validators.required),
    apellidoMaterno: new FormControl(''),
    correo: new FormControl('', [Validators.email]),
    sexo: new FormControl<string | null>(null, [Validators.required]),
    afiliacion: new FormControl<string>('Miembro', [Validators.required]),
    compromisoActual: new FormControl<string | null>(null, [Validators.required]),
    hipocoristico: new FormControl<string | null>(null),
    curp: new FormControl<string | null>(null),
    rfc: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.modo = this.router.url.includes('agregar') ? 'agregar' : 'editar';
    if (this.modo === 'editar') {
      this.getPersona(this.id);
    } else {
      this.isLoading.set(false);
    }
  }

  onSubmit() {
    if (this.editarPersonaForm.valid) {
      this.isLoading.set(true);
      const formValue = this.editarPersonaForm.value;
      if(this.modo === 'agregar'){
        this.service.agregarPersona(formValue).subscribe({
          next: (result) => {
            console.log(result);
            this.router.navigate([`/personas/ver/${result.id}`]);
          },
          error: error => {
            console.log(error);
            alert('Error en agregar la persona');
          },
        });
      } else {
        const updatedPersona: IPersona = Object.assign({}, this.persona, this.editarPersonaForm.value);
        this.service.editarPersona(updatedPersona).subscribe({
          next: (result) => {
            console.log(result);
            this.router.navigate([`/personas/ver/${updatedPersona.id}`]);
          },
          error: error => {
            console.log(error);
          }
        })
      }
    }
  }

  confirmDeletion(): void {
    const dialogRef = this.dialog.open<ConfirmacionComponent, ConfirmacionData, boolean>(ConfirmacionComponent, {
      data: {
        title: 'Borrar Persona',
        content: '¿Seguro que quieres borrar esta persona y toda su data asociada? Esta acción no se puede deshacer.',
        actionButtonText: 'Borrar'
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result === true) {
        this.isLoading.set(true);
        console.log('Deleting persona');
        this.service.deletePersona(this.id).subscribe({
          next: (apiResult: boolean) => {
            if (apiResult) {
              this.router.navigate(['/personas']);
            } else {
              console.error('Error en eliminar la persona');
              this.isLoading.set(false);
            }
          },
          error: error => {
            console.error('Error deleting persona:', error);
            this.isLoading.set(false);
          }
        });
      }
    });
  }

  private getPersona(id: string): void {
    this.isLoading.set(true);
    this.service.getPersona(id).subscribe({
      next: persona => {
        this.editarPersonaForm.patchValue(persona);
        this.isLoading.set(false);
        this.persona = persona;
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
