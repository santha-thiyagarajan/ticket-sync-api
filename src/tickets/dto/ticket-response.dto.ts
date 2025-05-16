import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '../entities/ticket.entity';

export class TicketMetadata {
  @ApiProperty({
    description: 'Total number of tickets matching the query',
    example: 42
  })
  totalCount: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5
  })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of tickets with "open" status',
    example: 15
  })
  openCount: number;

  @ApiProperty({
    description: 'Total number of tickets with "in_progress" status',
    example: 12
  })
  inProgressCount: number;

  @ApiProperty({
    description: 'Total number of tickets with "resolved" status',
    example: 8
  })
  resolvedCount: number;
}

export class PaginatedTicketsResponse {
  @ApiProperty({
    description: 'Array of tickets',
    type: [Ticket]
  })
  data: Ticket[];

  @ApiProperty({
    description: 'Metadata including pagination and status counts',
    type: TicketMetadata
  })
  meta: TicketMetadata;
} 