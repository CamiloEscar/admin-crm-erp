import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from '../../../config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent {

  name: string = '';

  isLoading: any;

  SIDEBAR: any = SIDEBAR;

  permisions:any = [];

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  addPermission(permiso:string) {
    let INDEX = this.permisions.findIndex((perm:string) => perm == permiso)
    if(INDEX != -1) {
      this.permisions.splice(INDEX, 1)
    } else {
      this.permisions.push(permiso)
    }
    // console.log(this.permisions)
  }

  store(){

    if (!this.name) {
      this.toastr.error("Validacion", "El nombre es requerido")
      return false;
    }
    if (this.permisions.length == 0) {
      this.toastr.error("Validacion", "Necesitas seleccionar al menos un permiso")
      return false;
    }

    let data = {
      name: this.name,
      permisions: this.permisions
    }

    this.rolesService.registerRole(data).subscribe((resp:any) => {
      console.log(resp)
    })
  }
}
