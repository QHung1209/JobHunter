import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        console.log(user)
        if (user) {
            if (this.usersService.checkUserPassword(pass, user.password)) {
                return user;
            }
        }
        return null;
    }

    async login(user: IUser) {
        console.log(user)
        const payload = {
            name: user.name,
            _id: user._id,
            email: user.email,
            role: user.role,
            sub: "token login",
            iss: "from server"
        };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET'), }), name: user.name,
            _id: user._id,
            email: user.email,
            role: user.role,
        };
    }
}
