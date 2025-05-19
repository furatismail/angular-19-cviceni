import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedSignalExampleComponent } from './linked-signal-example.component';

describe('LinkedSignalExampleComponent', () => {
  let component: LinkedSignalExampleComponent;
  let fixture: ComponentFixture<LinkedSignalExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedSignalExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedSignalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
