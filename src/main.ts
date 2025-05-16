import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in the DTO
      transform: true, // Transform payloads to DTOs
      forbidNonWhitelisted: true, // Throw errors for properties not in the DTO
    }),
  );
  
  // Set API prefix
  app.setGlobalPrefix('api/v1');
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Ticket Sync API')
    .setDescription(`
      API documentation for the Ticket Sync platform.
      
      ## Key Features
      - Complete ticket management with CRUD operations
      - User management
      - Rich metadata including ticket status counts
      - Flexible filtering and pagination
    `)
    .setVersion('1.0')
    .addTag('tickets', 'Ticket management endpoints with status counts')
    .addTag('users', 'User management endpoints')
    .addBearerAuth() // For future auth implementation
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });
  
  // Get port from environment or default to 3000
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
  console.log(`Swagger documentation is available at http://localhost:${port}/api/docs`);
}
bootstrap();
