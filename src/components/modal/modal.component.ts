import { Component, Input, output } from '@angular/core';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ChangedUser, UserType } from 'src/types/userType';

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
  onUpdataUser = output<ChangedUser>();

  createUser(event: UserType) {
    this.onCreateUser.emit(event);
  }
  updataUser(event: ChangedUser) {
    this.onUpdataUser.emit(event);
  }

  onDelete(name: string) {
    this.onDeleteUser.emit(name);
  }

  onCloseMenu(event: boolean) {
    this.onCloseModal.emit(event);
  }
}
