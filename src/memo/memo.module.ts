import { Module } from '@nestjs/common';
import { MemoService } from '@src/memo/memo.service';
import { MemoController } from '@src/memo/memo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from '@src/memo/entities/memo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Memo])
  ],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
