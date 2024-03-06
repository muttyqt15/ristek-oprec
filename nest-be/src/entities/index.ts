import { Acara } from './other/Acara';
import { GroupOKK } from './other/GroupOKK';
import { Rapat } from './other/Rapat';
import { AcaraSpeakerSpokeIn } from './users/external/AcaraSpeakerSpokeIn';
import { Mentee } from './users/external/Mentee';
import { Speaker } from './users/external/Speaker';
import { Sponsor } from './users/external/Sponsor';
import { Sponsorship } from './users/external/Sponsorship';
import { AnggotaBPH } from './users/panitia/AnggotaBPH';
import { Mentor } from './users/panitia/Mentor';
import { PengurusInti } from './users/panitia/PengurusInti';
import { SuperAdmin } from './users/SuperAdmin';

const entities = [
  AnggotaBPH,
  PengurusInti,
  Acara,
  Mentor,
  Mentee,
  GroupOKK,
  Sponsor,
  Speaker,
  Rapat,
  SuperAdmin,
  AcaraSpeakerSpokeIn,
  Sponsorship,
];
export default entities;
