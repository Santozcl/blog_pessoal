import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { JwtAuthGuard } from "../guard/jtw-auth.guard";
import { localAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller('/auth' )
export class AuthController {
    usuarioService: any;
    constructor(private authService: AuthService) { }

    @UseGuards(localAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin): Promise<any> {
        return this.authService.login(user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }

}