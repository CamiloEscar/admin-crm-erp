import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  @Input() roles: any = [];
  @Output() UserC: EventEmitter<any> = new EventEmitter();
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  role_id: string = '';
  gender: string = '';
  type_document: string = 'DNI';
  n_document: string = '';
  address: string = '';
  file_name: any;
  imagen_preavizualiza: any;

  isLoading: any;

  password: string = '';
  password_repeat: string = '';

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  processFile($event: any) {
    if($event.target.files[0].type.indexOf("image") < 0) {
      this.toastr.warning("Error", "El archivo debe ser una imagen")
    }
    this.file_name = $event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(this.file_name);
    reader.onloadend = () => {
      this.imagen_preavizualiza = reader.result;
    }

  }

  store(){

    if (!this.name) {
      this.toastr.error("Validacion", "El nombre es requerido")
      return false;
    }
    if (!this.phone) {
      this.toastr.error("Validacion", "El telefono es requerido")
      return false;
    }
    if (!this.gender) {
      this.toastr.error("Validacion", "El genero es requerido")
      return false;
    }
    if (!this.role_id) {
      this.toastr.error("Validacion", "El rol es requerido")
      return false;
    }
    if (!this.n_document || !this.type_document) {
      this.toastr.error("Validacion", "El documento es requerido y el tipo")
      return false;
    }
    if(!this.password){
      this.toastr.error("Validacion", "La contraseña es requerida")
    }
    if(this.password && this.password != this.password_repeat){
      this.toastr.error("Validacion", "Las contraseñas deben coincidir")
    }

    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("email", this.email);
    formData.append("phone", this.phone);
    formData.append("role_id", this.role_id);
    formData.append("gender", this.gender);
    formData.append("type_document", this.type_document);
    formData.append("n_document", this.n_document);
    if (this.address) {
      formData.append("address", this.address);
    }
    formData.append("password", this.password);
    formData.append("imagen", this.file_name);

    this.usersService.registerUser(formData).subscribe((resp:any) => {
      // console.log(resp)
      if(resp.message == 403) {
        this.toastr.error("Error", resp.message_text)
      } else {
        this.toastr.success("Exito", "Usuario creado correctamente")
        this.UserC.emit(resp.user);
        this.modal.close();
      }
    })
  }

}
