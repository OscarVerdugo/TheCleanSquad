import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesabcPage } from './clientesabc.page';

describe('ClientesabcPage', () => {
  let component: ClientesabcPage;
  let fixture: ComponentFixture<ClientesabcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesabcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesabcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
