import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Password hash (hidden in responses)',
    example: 'password123',
    writeOnly: true,
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'URL to the user avatar image',
    required: false,
    example: 'https://randomuser.me/api/portraits/men/1.jpg',
  })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    type: Date,
    example: '2023-09-30T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    type: Date,
    example: '2023-09-30T15:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
} 