import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonasService } from '../../../services/personas.service';
import { IPersona } from '../../../../../../types/i-persona';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';

@Component({
  selector: 'app-ver-persona',
  standalone: true,
  imports: [
    DatePipe,
    PageLoaderComponent,
    RouterLink
  ],
  templateUrl: './ver-persona.component.html',
  styleUrl: './ver-persona.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerPersonaComponent implements OnInit {
  private service = inject(PersonasService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  persona?: IPersona;
  isLoading = true;

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state && navigation?.extras?.state['persona']) {
      this.persona = navigation.extras?.state['persona'];
      this.isLoading = false;
      this.cdr.markForCheck();
    } else {
      this.getPersona(this.id);
    }
  }

  private getPersona(id: string): void {
    this.service.getPersona(id).subscribe({
      next: persona => {
        this.persona = persona;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

}
