import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Notes {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    createdAt : Date;

    @ManyToOne(() => User,(user) => user.notes)
    @JoinColumn({name : "user_id"})
    user : User;
}