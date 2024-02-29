import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainRole } from '../types/entity.types';
import { Acara } from 'src/entities/other/Acara';
export enum PaketSponsor {
  PLATINUM = 'Platinum',
  GOLD = 'Gold',
  SILVER = 'Silver',
}
@Entity({ name: 'sponsor' })
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand_name: string;

  // Similiar to password
  @Column()
  brand_code: string;

  @Column()
  paket_sponsor: PaketSponsor;

  @ManyToMany(() => Acara, (acara) => acara.sponsors, { nullable: true })
  acara?: Acara[];

  @Column({ nullable: true, default: MainRole.SPONSOR })
  role?: MainRole.SPONSOR;
}
