import { ApiProperty } from "@nestjs/swagger";

// you can add validate using class-validator
export class LoginDto{
    @ApiProperty({type:"string", example: "john"})
    name:string

    @ApiProperty({type:"string", example: "changeme"})
    password:string
}

export class SignUpDto{
    @ApiProperty({type:"string", example: "john"})
    name:string

    @ApiProperty({type:"string", example: "john"})
    email:string

    @ApiProperty({type:"string", example: "changeme"})
    password:string
}