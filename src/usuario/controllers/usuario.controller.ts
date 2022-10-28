import { HttpStatus, UseGuards } from "@nestjs/common";
import { Body, Controller, Get, HttpCode, Post, Put } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger/dist";
import { JwtAuthGuard } from "src/auth/guard/jtw-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@ApiTags('Usuarios')
@Controller('/usuarios')
@ApiBearerAuth()
export class UsuarioController{
    constructor(
        private readonly usuarioService: UsuarioService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Usuario[]>{
        return this.usuarioService.findAll()
    }
    
    @Post('/cadastrar')
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/Atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }



}