import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_URI)],
    exports: [MongooseModule],
})
export class DatabaseModule {}