import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTicketDto {
  @ApiPropertyOptional({
    description: 'Updated title of the ticket',
    example: 'Updated: Fix login page styling',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the ticket',
    example: 'The login page has alignment issues on mobile and tablet devices. Need to fix the CSS.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated status of the ticket',
    enum: ['open', 'in_progress', 'review', 'resolved', 'closed'],
    example: 'in_progress',
  })
  @IsOptional()
  @IsEnum(['open', 'in_progress', 'review', 'resolved', 'closed'])
  status?: TicketStatus;

  @ApiPropertyOptional({
    description: 'Updated priority level of the ticket',
    enum: ['low', 'medium', 'high', 'critical'],
    example: 'high',
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority?: TicketPriority;

  @ApiPropertyOptional({
    description: 'ID of the updated user assigned to the ticket',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Updated tags associated with the ticket',
    type: [String],
    example: ['frontend', 'bug', 'mobile', 'tablet'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Updated timestamp',
    type: Date,
    example: '2023-09-30T15:30:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
} 