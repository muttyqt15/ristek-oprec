import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'speaker' })
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expert_field: string;
}
