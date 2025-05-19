import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UntrackedExampleComponent } from './untracked-example.component';

describe('UntrackedExampleComponent', () => {
  let component: UntrackedExampleComponent;
  let fixture: ComponentFixture<UntrackedExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UntrackedExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UntrackedExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
