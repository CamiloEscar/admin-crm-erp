import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {

  @Output() RoleE: EventEmitter<any> = new EventEmitter();
  @Input() ROLE_SELECTED: any;
  name: string = '';

  isLoading: any;

  SIDEBAR: any = SIDEBAR;

  permisions:any = [];

  ID_ROLE:string = ''

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.name = this.ROLE_SELECTED.name;
    this.permisions = this.ROLE_SELECTED.permission_pluck;
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

    this.rolesService.updateRole(this.ROLE_SELECTED.id, data).subscribe((resp:any) => {
      // console.log(resp)
      if(resp.message == 403) {
        this.toastr.error("Error", resp.message_text)
      } else {
        this.toastr.success("Exito", "Rol se edito correctamente")
        this.RoleE.emit(resp.role);
        this.modal.close();
      }
    })
  }
}
