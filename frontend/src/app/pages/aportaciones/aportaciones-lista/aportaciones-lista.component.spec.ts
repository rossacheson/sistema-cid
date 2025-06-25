import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AportacionesListaComponent } from './aportaciones-lista.component';

describe('AportacionesListaComponent', () => {
  let component: AportacionesListaComponent;
  let fixture: ComponentFixture<AportacionesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AportacionesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AportacionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
