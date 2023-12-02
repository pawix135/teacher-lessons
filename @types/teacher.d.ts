import { AccountType } from "@prisma/client";

interface Teacher {
  name: string;
  id: number;
  image?: string;
  reviews?: UserReview[];
  account?: {
    id: number;
    login: string;
    hash?: string;
    type: AccountType;
    teacher?: Teacher;
    teacherId?: number;
  };
}
