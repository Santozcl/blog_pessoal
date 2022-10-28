import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_usuario'})
export class Usuario{

@PrimaryGeneratedColumn()
@ApiProperty()
public id: number


@IsNotEmpty()
@ApiProperty({example:'email@email.com'})
@Column({length:255, nullable:false})
public usuario: string;

@IsNotEmpty()
@ApiProperty()
@MinLength(8)
@Column({length:255, nullable:false})
public senha: string;


@Column({length: 5000})
public foto: string;

@OneToMany(()=> Postagem,(postagem)=> postagem.usuario)
postagem: Postagem[]

}