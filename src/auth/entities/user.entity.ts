import { UserType } from '@prisma/client';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    delete this.password;
  }

  id: string;
  email: string;
  type: UserType;
  name?: string | null;
  farmName?: string | null;
  contactName?: string | null;
  contactPosition?: string | null;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;

}
