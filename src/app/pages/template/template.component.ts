import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  usuario = {
    nombre: '',
    apellido: '',
    email: ''
  };
  constructor() { }
  guardar(form: NgForm): void {
    if (form.valid) {
      console.log(form);
    }
  }
}
