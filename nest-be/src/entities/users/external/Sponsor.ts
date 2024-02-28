import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
type PaketSponsor = 'Platinum' | 'Gold' | ' Silver';
@Entity({ name: 'sponsor' })
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand_name: string;

  @Column()
  paket_sponsor: PaketSponsor;
}
