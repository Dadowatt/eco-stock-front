import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMove } from './product-move';

describe('ProductMove', () => {
  let component: ProductMove;
  let fixture: ComponentFixture<ProductMove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMove],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
