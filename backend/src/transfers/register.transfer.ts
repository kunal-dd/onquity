import { IsNotEmpty, MinLength, IsEmail, MaxLength, Matches } from 'class-validator'

export class RegisterTransfer {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    full_name: string

    @IsEmail({ require: true })
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
        message: 'Mobile Number is invalid',
    })
    mobile_no: string

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Please use strong password',
    })
    password: string
}
