import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new HttpExceptionFilter());
    
    const port = process.env.PORT || 3000;

    app.enableCors({
        origin: 'http://localhost:4200',
        allowedHeaders: 'Content-Type, Accept',
    });
    
    await app.listen(port);
    
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
