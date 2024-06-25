import { Memo } from "@src/memo/entities/memo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('PROJECT')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 1000, comment: '프로젝트 제목' })
  title: string;

  @Column({ type: 'varchar', nullable: true, comment: '파일저장 경로'})
  fileUrl: string;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.projectUuid)
  memos: Memo[];
}