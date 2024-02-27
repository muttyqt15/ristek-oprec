import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GlobalAuthorityLevel, MainRole } from './types/entity.types';

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

  @Column({
    type: 'enum',
    enum: GlobalAuthorityLevel,
    nullable: true,
    default: GlobalAuthorityLevel.GLOBAL_ADMIN, // Because a user that isnt logged in is outside of OKK context (like a god)
  })
  global_authority: GlobalAuthorityLevel;
}
