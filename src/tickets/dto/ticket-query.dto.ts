import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TicketQueryDto {
  @ApiPropertyOptional({
    description: 'Filter tickets by status',
    enum: ['open', 'in_progress', 'review', 'resolved', 'closed'],
  })
  @IsOptional()
  @IsEnum(['open', 'in_progress', 'review', 'resolved', 'closed'])
  status?: TicketStatus;

  @ApiPropertyOptional({
    description: 'Filter tickets by priority',
    enum: ['low', 'medium', 'high', 'critical'],
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority?: TicketPriority;

  @ApiPropertyOptional({
    description: 'Filter tickets by assigned user ID',
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Filter tickets by creator user ID',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter tickets by title',
    example: 'login',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: ['id', 'title', 'description', 'status', 'priority', 'assignedTo', 'createdBy', 'createdAt', 'updatedAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'id', 'title', 'description', 'status', 'priority', 
    'assignedTo', 'createdBy', 'createdAt', 'updatedAt'
  ])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order direction',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
} 