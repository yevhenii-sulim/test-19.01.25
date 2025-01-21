import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserType } from '../../types/userType';
import { CustomDateFormatPipe } from 'src/pipe/custom-date-format.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CustomDateFormatPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit, OnChanges {
  constructor() {}
  @Input() userList: UserType[] = [];
  displayedColumns: string[] = [
    'First Name',
    'Last Name',
    'Create at',
    'Tags',
    'Email',
    'Description',
  ];
  dataSource = new MatTableDataSource<UserType>(this.userList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isOpen = output<{ option: string; name: string }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userList']) {
      this.dataSource.data = this.userList;
    }
  }
  onCloseMenu() {}
  onOpenMenu({ option, name }: { option: string; name: string }): void {
    this.isOpen.emit({ option: option, name: name });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    console.log('list');
  }
}
