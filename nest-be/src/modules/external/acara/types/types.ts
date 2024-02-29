import { PaketSponsor } from 'src/entities/users/external/Sponsor';

export type CreateSponsorParams = {
  brand_name: string;
  brand_code: string;
  paket_sponsor: PaketSponsor;
};

export type CreateSpeakerParams = {
  name: string;
  expert_field: string;
  speaker_code: string;
};
