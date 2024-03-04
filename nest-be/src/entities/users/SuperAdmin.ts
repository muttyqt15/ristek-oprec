import { Entity } from 'typeorm';
import { User } from './User';

@Entity({ name: 'super_admin' })
export class SuperAdmin extends User {}
