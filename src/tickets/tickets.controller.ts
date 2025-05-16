import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Ticket } from './entities/ticket.entity';
import { PaginatedTicketsResponse } from './dto/ticket-response.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiCreatedResponse({ 
    description: 'The ticket has been successfully created.',
    type: Ticket 
  })
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all tickets with filters and pagination',
    description: 'Returns a paginated list of tickets with metadata including status counts (open, in progress, resolved)'
  })
  @ApiOkResponse({ 
    description: 'Returns a list of tickets with pagination metadata and status counts.',
    type: PaginatedTicketsResponse
  })
  async findAll(@Query(new ValidationPipe({ transform: true })) query: TicketQueryDto) {
    const [tickets, totalCount, statusCounts] = await this.ticketsService.findAll(query);
    
    const page = query.page || 1;
    const limit = query.limit || 10;
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      data: tickets,
      meta: {
        totalCount,
        page,
        limit,
        totalPages,
        ...statusCounts
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ticket by ID' })
  @ApiParam({ name: 'id', description: 'Ticket ID', type: Number })
  @ApiOkResponse({ 
    description: 'Returns the ticket with the specified ID.',
    type: Ticket 
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID', type: Number })
  @ApiOkResponse({ 
    description: 'Returns the updated ticket.',
    type: Ticket 
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID', type: Number })
  @ApiNoContentResponse({ description: 'The ticket has been successfully deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.ticketsService.remove(id);
  }
} 