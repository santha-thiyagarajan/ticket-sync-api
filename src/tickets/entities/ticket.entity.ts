import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export type TicketStatus = 'open' | 'in_progress' | 'review' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

@Entity('tickets')
export class Ticket {
  @ApiProperty({
    description: 'Unique identifier for the ticket',
    example: 1000000,
  })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Unique identifier for the ticket',
    unsigned: true,
  })
  id: number;

  @ApiProperty({
    description: 'Title of the ticket',
    example: 'Fix login page styling',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the ticket',
    example: 'The login page has alignment issues on mobile devices. Need to fix the CSS.',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Current status of the ticket',
    enum: ['open', 'in_progress', 'review', 'resolved', 'closed'],
    example: 'open',
  })
  @Column({
    type: 'enum',
    enum: ['open', 'in_progress', 'review', 'resolved', 'closed'],
    default: 'open',
  })
  status: TicketStatus;

  @ApiProperty({
    description: 'Priority level of the ticket',
    enum: ['low', 'medium', 'high', 'critical'],
    example: 'medium',
  })
  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  })
  priority: TicketPriority;

  @ApiProperty({
    description: 'ID of the user assigned to the ticket',
    required: false,
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  @Column({ nullable: true })
  assignedTo: string;

  @ApiProperty({
    description: 'User assigned to the ticket',
    required: false,
    type: () => User,
  })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedTo' })
  assignee: User;

  @ApiProperty({
    description: 'ID of the user who created the ticket',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'User who created the ticket',
    type: () => User,
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @ApiProperty({
    description: 'Tags associated with the ticket',
    type: [String],
    example: ['frontend', 'bug', 'mobile'],
  })
  @Column('simple-array')
  tags: string[];

  @ApiProperty({
    description: 'Timestamp when the ticket was created',
    type: Date,
    example: '2023-09-30T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the ticket was last updated',
    type: Date,
    example: '2023-09-30T15:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
} 