import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  run: string;
  name: string;
  password: string;
}
