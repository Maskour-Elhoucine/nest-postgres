import { Module } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forgot } from './entities/forgot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forgot])],
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}
