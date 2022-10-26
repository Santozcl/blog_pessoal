import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}

    async findByUsuario(usuario:string): Promise<Usuario>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario
            }
        })
    }
    
    async findAll():Promise<Usuario[]>{
        return await this.usuarioRepository.find({
            relations:{
                postagem:true
            }
        })
    }

    async findById(id:number): Promise<Usuario>{
        let usuario = await this.usuarioRepository.findOne({
            where:{
                id
            },
            relations:{
                postagem: true
            }
        })
        if(!usuario)
        throw new HttpException('Usuario não encotrado', HttpStatus.BAD_REQUEST)
        return usuario
    }
        async create(usuario: Usuario): Promise<Usuario>{
            let busacaUsuario = await this.findByUsuario(usuario.usuario)

            if(busacaUsuario)
                throw new HttpException('Já tem', HttpStatus.BAD_REQUEST);
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario)
        }

        async update(usuario: Usuario): Promise<Usuario>{
            let updateUsuario: Usuario = await this.findById(usuario.id)
            let buscaUsuario = await this.findByUsuario(usuario.usuario)

            if(!updateUsuario)
            throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND)

            if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario)

        }


}