import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyLoaderComponent } from './delivery-boy-loader.component';

describe('DeliveryBoyLoaderComponent', () => {
  let component: DeliveryBoyLoaderComponent;
  let fixture: ComponentFixture<DeliveryBoyLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryBoyLoaderComponent]
    });
    fixture = TestBed.createComponent(DeliveryBoyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
