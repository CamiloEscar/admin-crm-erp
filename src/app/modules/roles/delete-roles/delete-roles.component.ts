import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {

  @Output() RoleD: EventEmitter<any> = new EventEmitter();
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
    }


    delete(){
      this.rolesService.deleteRole(this.ROLE_SELECTED.id).subscribe((resp:any) => {
        // console.log(resp)
        if(resp.message == 403) {
          this.toastr.error("Error", resp.message_text)
        } else {
          this.toastr.success("Exito", "Rol se elimino correctamente")
          this.RoleD.emit(resp.role);
          this.modal.close();
        }
      })
    }
}
