import { Component, Input, output } from '@angular/core';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { UserType } from 'src/types/userType';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalEditComponent, ModalCreateComponent, ModalDeleteComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() userName: string = '';
  @Input() userList: UserType[] = [];
  @Input() isOpenDeleteModal: boolean = false;
  @Input() isOpenEditModal: boolean = false;
  @Input() isOpenCreateModal: boolean = false;
  onCloseModal = output<boolean>();
  onCreateUser = output<UserType>();
  onDeleteUser = output<string>();

  createUser(event: any) {
    this.onCreateUser.emit(event);
  }

  onDelete(name: string) {
    this.onDeleteUser.emit(name);
  }

  onCloseMenu(event: boolean) {
    this.onCloseModal.emit(event);
  }
}
