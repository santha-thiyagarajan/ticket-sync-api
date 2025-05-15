import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ 
    description: 'The user has been successfully created.',
    type: User
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with filters and pagination' })
  @ApiOkResponse({ 
    description: 'Returns a list of users with pagination metadata.',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/User' }
        },
        meta: {
          type: 'object',
          properties: {
            totalCount: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  async findAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryDto) {
    const [users, totalCount] = await this.usersService.findAll(query);
    
    const page = query.page || 1;
    const limit = query.limit || 10;
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      data: users,
      meta: {
        totalCount,
        page,
        limit,
        totalPages,
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiOkResponse({ 
    description: 'Returns the user with the specified ID.',
    type: User
  })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiOkResponse({ 
    description: 'Returns the updated user.',
    type: User
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiNoContentResponse({ description: 'The user has been successfully deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
} 