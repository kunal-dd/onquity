import { IsNotEmpty, MinLength, IsString } from 'class-validator'

export class LoginTransfer {
    @IsNotEmpty()
    @IsString()
    public email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    public password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}
