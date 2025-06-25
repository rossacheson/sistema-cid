import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAportacionComponent } from './editar-aportacion.component';

describe('EditarAportacionComponent', () => {
  let component: EditarAportacionComponent;
  let fixture: ComponentFixture<EditarAportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAportacionComponent] // May need to mock dependencies like ActivatedRoute, Router, MatDialog, services
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
