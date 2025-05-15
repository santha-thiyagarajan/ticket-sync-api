import { User } from '../../users/entities/user.entity';

export const mockUsers: Partial<User>[] = [
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    email: 'mike.wilson@example.com',
    name: 'Mike Wilson',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    email: 'david.thompson@example.com',
    name: 'David Thompson',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
]; 