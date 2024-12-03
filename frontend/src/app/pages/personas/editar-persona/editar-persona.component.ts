import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { PersonasService } from '../../../services/personas.service';

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
    MatOption
  ],
  templateUrl: './editar-persona.component.html',
  styleUrl: './editar-persona.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPersonaComponent implements OnInit {
  router = inject(Router);
  personasService = inject(PersonasService);
  modo!: 'agregar' | 'editar';
  isLoading = false;

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
  }

  onSubmit() {
    if (this.editarPersonaForm.valid) {
      this.isLoading = true;
      const formValue = this.editarPersonaForm.value;
      if(this.modo === 'agregar'){
        this.personasService.agregarPersona(formValue).subscribe({
          next: (result) => {
            console.log(result);
            this.router.navigate([`/personas/ver/${result.id}`]);
          },
          error: error => {
            console.log(error);
            alert('Error en agregar la persona');
          },
        });
      }
    }
  }
}
