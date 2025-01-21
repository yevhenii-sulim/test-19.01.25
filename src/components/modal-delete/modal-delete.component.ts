import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  @Input() userName: string = '';
  onCloseModal = output<boolean>();
  onDeleteUser = output<string>();
  onCancel() {
    this.onCloseModal.emit(false);
  }
  onDelete(name: string) {
    this.onDeleteUser.emit(name);
  }
}
