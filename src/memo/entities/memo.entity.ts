import { Project } from "@src/project/entity/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('MEMO')
export class Memo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000, comment: '메모 내용' })
  content: string

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @ManyToOne(() => Project, (project) => project.memos, { nullable: false })
  @JoinColumn({ name: 'project_uuid' })
  projectUuid: string;
}
