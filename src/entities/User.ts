import { IsEmail, Length } from "class-validator";
import { Entity as TOEntity, Column, Index, BeforeInsert, OneToMany } from "typeorm";
import bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import Entity from './Entity'
import Post from "./Post";

@TOEntity('users')
export  default class User extends Entity {
    //partial allows nullable fields // Bas entity allows active record approach
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    // @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string



    // @Index()
    @Length(6, 255, { message: 'Username must be 6 characters or more without spaces.' })
    @Column({ unique: true })
    username: string

    @Exclude()
    @Index()
    @Length(8, 255, { message: 'Password must be combination of 8 letters and numbers, including uppecase and lower case, without spaces.' })
    @Column()
    //^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$
    //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}
    // @IsUppercase()
    // @IsLowercase()
    password: string

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }



}
