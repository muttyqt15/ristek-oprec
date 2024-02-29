import { Acara } from 'src/entities/other/Acara';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'speaker' })
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expert_field: string;

  @Column()
  speaker_code: string;

  @ManyToMany(() => Acara, (acara) => acara.speakers, { nullable: true })
  acara?: Acara[];
}
