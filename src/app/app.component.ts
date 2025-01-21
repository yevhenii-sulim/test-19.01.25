import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ChangedUser, UserType } from '../types/userType';
import { UserListComponent } from '../components/user-list/user-list.component';
import { ModalComponent } from 'src/components/modal/modal.component';
import { CreateUserComponent } from 'src/components/create-user/create-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, ModalComponent, CreateUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userList: UserType[] = [];
  isOpen: boolean = false;
  title = 'test';
  userName: string = '';
  isOpenDeleteModal: boolean = false;
  isOpenEditModal: boolean = false;
  isOpenCreateModal: boolean = false;

  constructor(private service: UsersService) {}
  ngOnInit(): void {
    this.service.getData().subscribe((res) => {
      this.userList = res;
    });
  }

  onUpdataUser({ changedUser, index }: ChangedUser) {
    this.userList.splice(index, 1, changedUser);
    this.userList = [...this.userList];
    this.onCloseModal(false);
  }

  onCloseModal(event: boolean) {
    this.isOpen = event;
    this.isOpenDeleteModal = event;
    this.isOpenEditModal = event;
    this.isOpenCreateModal = event;
  }
  onDeleteUser(name: string) {
    const list = this.userList.filter((item) => item.firstName !== name);
    this.userList = list;
    this.onCloseModal(false);
  }
  onOpenModal(event: { option: string; name?: string }) {
    this.isOpen = true;
    if (event.name) {
      this.userName = event.name;
    }
    if (event.option === 'delete') {
      this.isOpenDeleteModal = true;
    }
    if (event.option === 'edit') {
      this.isOpenEditModal = true;
    }
    if (event.option === 'create') {
      this.isOpenCreateModal = true;
    }
  }
  onCreateUser(user: UserType) {
    const userList: UserType[] = [user, ...this.userList];
    this.userList = userList;
    this.onCloseModal(false);
  }
}
