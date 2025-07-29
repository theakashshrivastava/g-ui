import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroceryComponent } from './admin-grocery.component';

describe('AdminGroceryComponent', () => {
  let component: AdminGroceryComponent;
  let fixture: ComponentFixture<AdminGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGroceryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
