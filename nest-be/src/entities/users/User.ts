import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MainRole } from './types/entity.types';

@Entity({ name: 'users' })
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  batch: number;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: MainRole,
    default: MainRole.NON_STAFF,
  })
  role: MainRole;
}
