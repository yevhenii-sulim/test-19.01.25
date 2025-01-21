import { Component, output } from '@angular/core';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  openModal = output<{ option: string }>();
  onOpenModal() {
    this.openModal.emit({ option: 'create' });
  }
}
