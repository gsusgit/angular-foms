import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidadoresService} from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarFormulario();
    this.crearListeners();
  }
  ngOnInit(): void {
  }
  get usuarioNoValido(): boolean {
    return this.formGroup.get('usuario').invalid && this.formGroup.get('usuario').touched;
  }
  get pasatiempos(): any {
    return this.formGroup.get('pasatiempos') as FormArray;
  }
  get pass1NoValido(): boolean {
    return this.formGroup.get('pass1').invalid && this.formGroup.get('pass1').touched;
  }
  get pass2NoValido(): boolean {
    const pass1 = this.formGroup.get('pass1').value;
    const pass2 = this.formGroup.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }
  campoNoValido(campo: string): boolean {
    return this.formGroup.get(`${campo}`).invalid && this.formGroup.get(`${campo}`).touched;
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
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noFernandez]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required] , [this.validadores.existeUsuario]],
      direccion: this.formBuilder.group({
        codigoPostal: ['', [Validators.required, Validators.minLength(5)]],
        ciudad: ['', [Validators.required, Validators.minLength(5)]]
      }),
      pasatiempos: this.formBuilder.array([]),
      pass1: ['', Validators.required],
      pass2: ['', Validators.required]
    },
      {
        validators: this.validadores.passwordsIguales('pass1', 'pass2')
      }
    );
  }
  crearListeners(): any {
    this.formGroup.valueChanges.subscribe(valor => {
      console.log(valor);
    });
    console.log(this.formGroup);
  }
  cargarFormulario(): void {
    const datosPrueba = {
      nombre: 'Jesus',
      apellido: 'Fernande',
      email: 'jesus@gmail.com',
      direccion: {
        codigoPostal: '14012',
        ciudad: 'Cordoba'
      },
      pass1: '12345678',
      pass2: '12345678'
    };
    this.formGroup.reset(datosPrueba);
  }
  guardar(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.formGroup.reset();
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
