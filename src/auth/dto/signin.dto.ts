import { IsHash, IsString } from "class-validator"

export class SignInDWADto {
    @IsString()
    username: string

    @IsString()
    passwd: string
}

export class SignInUADto {
    @IsString()
    username: string

    @IsString()
    passwd: string
}