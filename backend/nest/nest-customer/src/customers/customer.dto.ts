import {IsEmail, MaxLength, IsOptional, IsString, IsNotEmpty} from 'class-validator';

export class CustomerDto {
    @IsString()
    @IsNotEmpty({message: "Le champ prénom Ne peut pas être vide"})
    @MaxLength(50,{message: 'Le nom est trop grand'})
    firstName: string;

    @IsString()
    @IsNotEmpty({message: "Le champ nom peut pas être vide"})
    @MaxLength(50)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(25,  {message: "Le champ Email trop long"})
    @IsOptional()
    email?:string;
}