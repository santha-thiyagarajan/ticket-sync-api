import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUsers } from './users.seed';
import { mockTickets } from './tickets.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get repositories
  const userRepository = app.get(getRepositoryToken(User));
  const ticketRepository = app.get(getRepositoryToken(Ticket));
  const dataSource = app.get(DataSource);
  
  // Seed users
  const existingUsers = await userRepository.count();
  let users: User[] = [];
  
  if (existingUsers === 0) {
    console.log('Seeding users...');
    
    // Insert all mock users
    for (const mockUser of mockUsers) {
      users.push(await userRepository.save(mockUser));
    }
    
    console.log(`Successfully seeded ${users.length} users`);
  } else {
    console.log(`Found ${existingUsers} existing users. Fetching them instead of seeding...`);
    users = await userRepository.find({ take: 5 });
  }
  
  // Seed tickets
  const existingTickets = await ticketRepository.count();
  
  if (existingTickets === 0 && users.length > 0) {
    console.log('Seeding tickets...');
    
    // Set the sequence to start from 1000000 before creating tickets
    await dataSource.query('ALTER SEQUENCE tickets_id_seq RESTART WITH 1000000');
    console.log('Set ticket ID sequence to start from 1000000');
    
    // Assign users to tickets and create them
    for (let i = 0; i < mockTickets.length; i++) {
      const creatorIndex = i % users.length;
      const assigneeIndex = (i + 1) % users.length;
      
      await ticketRepository.save({
        ...mockTickets[i],
        createdBy: users[creatorIndex].id,
        assignedTo: users[assigneeIndex].id,
      });
    }
    
    console.log(`Successfully seeded ${mockTickets.length} tickets`);
  } else {
    console.log(`Skipping ticket seeding. ${existingTickets} tickets already exist.`);
    
    // Even if we didn't seed tickets, still set the sequence
    if (existingTickets < 1000000) {
      await dataSource.query('ALTER SEQUENCE tickets_id_seq RESTART WITH 1000000');
      console.log('Set ticket ID sequence to start from 1000000');
    }
  }
  
  await app.close();
}

bootstrap(); 