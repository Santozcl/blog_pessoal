import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { localAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";

@ApiTags('Usuario')
@Controller('/auth' )
export class AuthController {
    
    constructor(private authService: AuthService) { }

    @UseGuards(localAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin): Promise<any> {
        return this.authService.login(user);
    }


}