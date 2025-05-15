import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Title of the ticket',
    example: 'Fix login page styling',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the ticket',
    example: 'The login page has alignment issues on mobile devices. Need to fix the CSS.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Current status of the ticket',
    enum: ['open', 'in_progress', 'review', 'resolved', 'closed'],
    example: 'open',
  })
  @IsNotEmpty()
  @IsEnum(['open', 'in_progress', 'review', 'resolved', 'closed'])
  status: TicketStatus;

  @ApiProperty({
    description: 'Priority level of the ticket',
    enum: ['low', 'medium', 'high', 'critical'],
    example: 'medium',
  })
  @IsNotEmpty()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority: TicketPriority;

  @ApiProperty({
    description: 'ID of the user assigned to the ticket',
    required: false,
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  assignedTo?: string;

  @ApiProperty({
    description: 'ID of the user who created the ticket',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  createdBy: string;

  @ApiProperty({
    description: 'Tags associated with the ticket',
    type: [String],
    example: ['frontend', 'bug', 'mobile'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
} 