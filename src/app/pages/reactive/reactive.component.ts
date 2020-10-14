import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.cargarFormulario();
  }
  campoNoValido(campo: string): boolean {
    return this.formGroup.get(`${campo}`).invalid && this.formGroup.get(`${campo}`).touched;
  }
  get pasatiempos(): any {
    return this.formGroup.get('pasatiempos') as FormArray;
  }
  agregarPasatiempo(): void {
    this.pasatiempos.push(this.formBuilder.control([]));
  }
  borrarPasatiempo(indice): any {
    this.pasatiempos.removeAt(indice);
  }
  crearFormulario(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: this.formBuilder.group({
        codigoPostal: ['', [Validators.required, Validators.minLength(5)]],
        ciudad: ['', [Validators.required, Validators.minLength(5)]]
      }),
      pasatiempos: this.formBuilder.array([])
    });
  }
  ngOnInit(): void {
  }
  cargarFormulario(): void {
    const datosPrueba = {
      nombre: 'Jesus',
      apellido: 'Fernandez',
      email: 'jesus@gmail.com',
      direccion: {
        codigoPostal: '14012',
        ciudad: 'Cordoba'
      }
    };
    this.formGroup.reset(datosPrueba);
  }
  guardar(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    this.formGroup.reset();
  }
}
