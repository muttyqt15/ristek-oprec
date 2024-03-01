import { Acara } from './other/Acara';
import { GroupOKK } from './other/GroupOKK';
import { Rapat } from './other/Rapat';
import { Mentee } from './users/external/Mentee';
import { Speaker } from './users/external/Speaker';
import { Sponsor } from './users/external/Sponsor';
import { AnggotaBPH } from './users/panitia/AnggotaBPH';
import { Mentor } from './users/panitia/Mentor';
import { PengurusInti } from './users/panitia/PengurusInti';

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
];
export default entities;
