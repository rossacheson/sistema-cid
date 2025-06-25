import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAportacionComponent } from './ver-aportacion.component';

describe('VerAportacionComponent', () => {
  let component: VerAportacionComponent;
  let fixture: ComponentFixture<VerAportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAportacionComponent] // May need to mock ActivatedRoute, Router, services
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
