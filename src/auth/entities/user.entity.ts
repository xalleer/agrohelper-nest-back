import { UserType } from '@prisma/client';


export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    delete this.password;
  }

  id: string;
  email: string;
  type: UserType;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  password?: string;
}
