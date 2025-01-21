import { Component, Input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserType } from 'src/types/userType';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent {
  @Input() userName: string = '';
  onCloseModal = output<boolean>();
  createUser = output<UserType>();
  selectedOptions: string[] = [];
  tags = new FormControl<string[]>([], { nonNullable: true });
  tagsList: string[] = [
    'mission',
    'politics',
    'ten',
    'she',
    'key',
    'stay',
    'ability',
  ];

  profileForm = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),
    tags: new FormControl<string[]>([], Validators.maxLength(3)),
    description: new FormControl<string>('', Validators.maxLength(1000)),
    createdAt: new FormControl<Date>(new Date()),
  });

  onCancel() {
    this.onCloseModal.emit(false);
  }

  onSelectionChange() {
    const selected = this.tags.value || [];
    if (selected.length > 3) {
      this.tags.setValue(selected.slice(0, 3));
    }
  }
  onSubmit() {
    const profileData = { ...this.profileForm.value, tags: this.tags.value };
    console.log(this.tags);
    this.createUser.emit(profileData as UserType);
  }

  removeTagTopping(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    const currentSelections = this.tags.value;
    this.tags.setValue(currentSelections.filter((item) => item !== tag));
  }
}
