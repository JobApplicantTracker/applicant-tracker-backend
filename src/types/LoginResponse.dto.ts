import { Users } from "src/entity/entities/Users.entity"

export type LoginResponseDTO = {
    user: Users,
    backendTokens: {
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
    }
}