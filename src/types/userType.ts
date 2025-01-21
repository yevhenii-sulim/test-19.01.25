export interface UserType {
  firstName: string;
  lastName: string;
  createdAt: string | Date;
  tags: string[];
  email: string;
  description: string;
}
export interface ChangedUser {
  changedUser: UserType;
  index: number;
}
