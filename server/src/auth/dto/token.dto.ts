import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";

export class TokenResponseDto {
    @ApiProperty({ example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    token: string;

    user: User;

    code: string;
}
