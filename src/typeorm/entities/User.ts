
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Notes } from './Notes';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt : Date;

  @OneToMany(() => Notes,(note) => note.user)
  notes : Notes[];
}
