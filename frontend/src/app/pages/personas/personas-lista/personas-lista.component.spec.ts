import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasListaComponent } from './personas-lista.component';

describe('PersonasListaComponent', () => {
  let component: PersonasListaComponent;
  let fixture: ComponentFixture<PersonasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
