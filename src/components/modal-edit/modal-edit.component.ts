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
import { ChangedUser, UserType } from 'src/types/userType';

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
  @Input() userName: string = '';
  @Input() userList: UserType[] = [];
  userIndex: number = 0;
  updataUser = output<ChangedUser>();
  selectedOptions: string[] = [];
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
    const selected = this.tags.value;
    if (selected.length > 3) {
      this.tags.setValue(selected.slice(0, 3));
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
    const updatedUser: UserType = {
      firstName: this.profileForm.value.firstName ?? '',
      lastName: this.profileForm.value.lastName ?? '',
      email: this.profileForm.value.email ?? '',
      description: this.profileForm.value.description ?? '',
      tags: this.tags.value || [],
      createdAt: this.profileForm.value.createdAt || new Date(),
    };

    const payload: ChangedUser = {
      changedUser: updatedUser,
      index: this.userIndex,
    };
    this.updataUser.emit(payload);
  }

  ngOnInit() {
    const user = this.userList.find((item) => item.firstName === this.userName);
    this.userIndex = this.userList.findIndex(
      (item) => item.firstName === this.userName
    );
    if (user) {
      const tags = user.tags;
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        tags: tags,
        description: user.description,
        createdAt: new Date(),
      });
    }
    const currentTags = this.profileForm.get('tags')?.value;
    if (currentTags) {
      this.tags.setValue(currentTags);
    }
  }

  removeTagTopping(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    const currentSelections = this.tags.value;
    this.tags.setValue(
      currentSelections.filter((item) => {
        return item !== tag;
      })
    );
  }
}
