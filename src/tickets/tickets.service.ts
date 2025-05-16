import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async findAll(queryParams: TicketQueryDto): Promise<[Ticket[], number, { openCount: number; inProgressCount: number; resolvedCount: number }]> {
    const { 
      status, priority, assignedTo, createdBy, search, 
      page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' 
    } = queryParams;

    // Build WHERE conditions
    const where: FindOptionsWhere<Ticket> = {};
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    if (createdBy) where.createdBy = createdBy;
    
    if (search) {
      where.title = Like(`%${search}%`);
      // For more comprehensive search across multiple fields, you'd need a more complex query
    }

    // Execute query with pagination, sorting, and relations
    const [tickets, totalCount] = await this.ticketRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { [sortBy]: sortOrder },
      relations: ['creator', 'assignee'], // Include related user entities
    });

    // Get counts for different ticket statuses
    const openCount = await this.ticketRepository.count({
      where: { status: 'open' },
    });

    const inProgressCount = await this.ticketRepository.count({
      where: { status: 'in_progress' },
    });

    const resolvedCount = await this.ticketRepository.count({
      where: { status: 'resolved' },
    });

    const statusCounts = {
      openCount,
      inProgressCount,
      resolvedCount,
    };

    return [tickets, totalCount, statusCounts];
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ 
      where: { id },
      relations: ['creator', 'assignee'], // Include related user entities
    });
    
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    
    console.log('BEFORE UPDATE', ticket);
    
    // Handle assignedTo change separately to properly update the relationship
    let newAssignee: User | null = ticket.assignee;
    if (updateTicketDto.assignedTo && updateTicketDto.assignedTo !== ticket.assignedTo) {
      newAssignee = await this.userRepository.findOne({ where: { id: updateTicketDto.assignedTo } });
      if (!newAssignee) {
        throw new NotFoundException(`User with ID ${updateTicketDto.assignedTo} not found`);
      }
    }
    
    // Apply other updates
    Object.assign(ticket, updateTicketDto);
    
    // Save the ticket with updates
    await this.ticketRepository.save(ticket);
    
    console.log('AFTER UPDATE', ticket);
    
    // Construct a fresh response with updated user information
    const updatedTicket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['creator', 'assignee'],
    });
    
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found after update`);
    }
    
    // Make sure assignee is updated in the response
    if (newAssignee && updateTicketDto.assignedTo) {
      updatedTicket.assignee = newAssignee;
    }
    
    return updatedTicket;
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }
} 