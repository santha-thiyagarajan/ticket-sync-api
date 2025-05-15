import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // In a real app, you'd hash the password before saving
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(queryParams: UserQueryDto): Promise<[User[], number]> {
    const { 
      search, 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      sortOrder = 'DESC' 
    } = queryParams;

    // Build WHERE conditions
    const where: FindOptionsWhere<User> = {};
    
    if (search) {
      where.name = Like(`%${search}%`);
      // For more comprehensive search including email, a more complex query would be needed
    }

    // Execute query with pagination and sorting
    return this.userRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { [sortBy]: sortOrder },
      select: ['id', 'email', 'name', 'avatar', 'createdAt', 'updatedAt'] // Exclude password
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'name', 'avatar', 'createdAt', 'updatedAt'] // Exclude password
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if trying to update email and if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    // Handle password change if requested
    if (updateUserDto.currentPassword && updateUserDto.newPassword) {
      // In a real app, you'd verify the current password and hash the new one
      // For this prototype, we'll just update directly
      user.password = updateUserDto.newPassword;
      
      // Remove these fields as they shouldn't be saved directly
      delete updateUserDto.currentPassword;
      delete updateUserDto.newPassword;
    }
    
    // Update other fields
    Object.assign(user, updateUserDto);
    
    // Save and return without password
    await this.userRepository.save(user);
    
    // Return user without password
    const { password, ...result } = user;
    return result as User;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
} 