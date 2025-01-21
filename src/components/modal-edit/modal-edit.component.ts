import { Component, Input, OnInit, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserType } from 'src/types/userType';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss',
})
export class ModalEditComponent implements OnInit {
  selectedOptions: string[] = [];
  @Input() userName: string = '';
  @Input() userList: UserType[] = [];
  user: UserType | undefined = {
    firstName: '',
    lastName: '',
    createdAt: '',
    tags: [],
    email: '',
    description: '',
  };
  onCloseModal = output<boolean>();
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

  onCancel() {
    this.onCloseModal.emit(false);
  }
  onSelectionChange() {
    if (this.selectedOptions.length > 3) {
      this.selectedOptions = this.selectedOptions.slice(0, 3);
    }
  }

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

  upDate() {
    console.warn(this.profileForm.value);
  }

  ngOnInit() {
    const user = this.userList.find((item) => item.firstName === this.userName);
    this.user = user;
    this.profileForm.patchValue({
      firstName: this.user?.firstName ?? '',
      lastName: this.user?.lastName ?? '',
      email: this.user?.email ?? '',
      tags: this.user?.tags ?? [],
      description: this.user?.description ?? '',
      createdAt: new Date(),
    });
    console.log(this.profileForm.value);
  }

  removeTagTopping(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    const currentSelections = this.tags.value;
    this.tags.setValue(currentSelections.filter((item) => item !== tag));
  }
}
