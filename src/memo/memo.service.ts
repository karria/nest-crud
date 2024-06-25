import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from '@src/memo/dto/create-memo.dto';
import { UpdateMemoDto } from '@src/memo/dto/update-memo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from '@src/memo/entities/memo.entity';
import { Equal, Repository } from 'typeorm';
import { Pagination } from '@src/common/pagination';
import { GetMemoDto } from './dto/get-memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}

  async create(createMemoDto: CreateMemoDto): Promise<Memo> {
    const result = await this.memoRepository.save({...createMemoDto});
    return result;
  }

  async findAll(): Promise<Memo[]> {
    return await this.memoRepository.find();
  }

  async findAllByProjectUuid(getMemoDto: GetMemoDto): Promise<Memo[]> {
    

    const memos = await this.memoRepository.find({
      where: { projectUuid: Equal(getMemoDto.projectUuid) },
      skip: getMemoDto.getSkip(),
      take: getMemoDto.getSize(),
    })

    return memos;
  }

  async findOne(id: number): Promise<Memo> {
    return await this.memoRepository.findOne({
      where: { id: id },
    })
  }

  async update(id: number, updateMemoDto: UpdateMemoDto): Promise<Memo> {
    const memo = await this.memoRepository.findOne({
      where: { id: id },
    })

    const updateMemo = {
      ...memo,
      ...updateMemoDto,
    };

    return await this.memoRepository.save(updateMemo);
  }

  async remove(id: number, projectUuid: string): Promise<boolean> {
    const result = await this.memoRepository.delete({ id: id, projectUuid: projectUuid });
    return result.affected ? true : false;
  }
}
