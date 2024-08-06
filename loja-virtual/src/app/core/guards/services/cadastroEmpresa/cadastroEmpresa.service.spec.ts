/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CadastroEmpresaService } from './cadastroEmpresa.service';

describe('Service: CadastroEmpresa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroEmpresaService]
    });
  });

  it('should ...', inject([CadastroEmpresaService], (service: CadastroEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
