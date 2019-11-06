import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosabcPage } from './pedidosabc.page';

describe('PedidosabcPage', () => {
  let component: PedidosabcPage;
  let fixture: ComponentFixture<PedidosabcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosabcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosabcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
