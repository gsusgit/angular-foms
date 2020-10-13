import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }
  get nombreNoValido(): boolean {
    return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }
  get apellidoNoValido(): boolean {
    return this.formGroup.get('apellido').invalid && this.formGroup.get('apellido').touched;
  }
  get emailNoValido(): boolean {
    return this.formGroup.get('email').invalid && this.formGroup.get('email').touched;
  }
  crearFormulario(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
  }
  guardar(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
