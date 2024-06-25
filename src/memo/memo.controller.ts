import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemoService } from '@src/memo/memo.service';
import { CreateMemoDto } from '@src/memo/dto/create-memo.dto';
import { UpdateMemoDto } from '@src/memo/dto/update-memo.dto';

@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  async create(@Body() createMemoDto: CreateMemoDto) {
    const memo = await this.memoService.create(createMemoDto);
    return { id: memo.id };
  }

  @Get()
  findAll() {
    return this.memoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.update(+id, updateMemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('projectUuid') projectUuid: string) {
    return this.memoService.remove(+id, projectUuid);
  }
}
