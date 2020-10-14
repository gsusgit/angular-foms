import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  constructor() { }
  noFernandez(campo: FormControl): ErrorValidate {
    if (campo.value?.toLowerCase() === 'fernandez') {
      return {
        noFernandez: true
      };
    }
    return null;
  }
  existeUsuario(campo: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!campo.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (campo.value === 'jesusfer') {
          resolve({
            existe: true
          });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
  passwordsIguales(pass1Name: string, pass2Name: string): any {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          noEsIgual: true
        });
      }
    };
  }
}
