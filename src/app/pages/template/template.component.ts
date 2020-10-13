import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
  paises: any[] = [];
  /*usuario = {
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    genero: '',
  };*/
  usuario = {
    nombre: 'Jesús',
    apellidos: 'Fernández Jódar',
    email: 'fernandezjodar.jesus@gmail.com',
    pais: 'ESP',
    genero: 'M'
  };
  constructor(private paisesService: PaisesService) { }
  ngOnInit(): void {
    this.paisesService.getPaises().subscribe(data => {
      this.paises = data;
      this.paises.unshift({
        nombre: 'Seleccione país',
        codigo: ''
      });
    });
  }

  guardar(form: NgForm): void {
    if (form.valid) {
      console.log(form.value);
    } else {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
