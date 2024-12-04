import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { PersonasService } from '../../../services/personas.service';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';
import { IIndividuo } from '../../../../../../types/i-individuo';

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
    PageLoaderComponent
  ],
  templateUrl: './editar-persona.component.html',
  styleUrl: './editar-persona.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPersonaComponent implements OnInit {
  router = inject(Router);
  service = inject(PersonasService);
  private cdr = inject(ChangeDetectorRef);
  modo!: 'agregar' | 'editar';
  isLoading = true;
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  private persona?: IIndividuo;

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
      this.isLoading = false;
    }
  }

  onSubmit() {
    if (this.editarPersonaForm.valid) {
      this.isLoading = true;
      this.cdr.markForCheck();
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
        const updatedPersona: IIndividuo = Object.assign({}, this.persona, this.editarPersonaForm.value);
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

  private getPersona(id: string): void {
    this.isLoading = true;
    this.service.getPersona(id).subscribe({
      next: persona => {
        this.editarPersonaForm.patchValue(persona);
        this.isLoading = false;
        this.cdr.markForCheck();
        this.persona = persona;
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
