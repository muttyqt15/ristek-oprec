import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sponsorship } from './Sponsorship';
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
  @Column({ select: false })
  brand_code: string;

  @OneToMany(() => Sponsorship, (spship) => spship.sponsor)
  sponsorships?: Sponsorship[];
}
