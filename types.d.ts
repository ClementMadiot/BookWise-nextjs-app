import { Role } from '@/components/admin/tables/Role';
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

// createBook
interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

// Borrow params
interface BorrowBookParams {
  userId: string;
  bookId: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  universityId: number;
  universityCard: string;
  createdAt: string;
  status?: string;
  booksBorrowed?: number;
}

interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status: string;
  createdAt: Date | null;
  book: Book;
  user: User;
  title: string;
  coverColor: string;
  coverUrl: string;
  fullName: string;
  email: string;
}