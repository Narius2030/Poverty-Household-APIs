import { IsHash, IsString } from "class-validator"

export class SignInDWADto {
    @IsString()
    @IsHash('md5')
    account_id: string

    @IsString()
    username: string

    @IsString()
    passwd: string
}