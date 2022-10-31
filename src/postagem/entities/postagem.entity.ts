import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'})
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @IsNotEmpty ()
    @Column ({length: 100, nullable: false})
    titulo: string


    @ApiProperty()
    @IsNotEmpty ()
    @Column ({length: 100, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn ()
    data: Date;

    @ApiProperty()
    @ManyToOne (() => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Tema

    @ApiProperty()
    @ManyToOne(()=> Usuario,(usuario) => usuario.postagem,{

        onDelete: 'CASCADE'
    })
    usuario: Usuario
    

}