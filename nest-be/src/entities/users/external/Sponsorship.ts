import { Acara } from 'src/entities/other/Acara';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaketSponsor, Sponsor } from './Sponsor';

@Entity({ name: 'sponsorship' })
export class Sponsorship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  package: PaketSponsor; // Or any other fields you need for the sponsorship package

  @ManyToOne(() => Sponsor, (sponsor) => sponsor.sponsorships)
  sponsor: Sponsor;

  @ManyToOne(() => Acara, (acara) => acara.sponsorships)
  acara: Acara;
}
