import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest) {
        //verificar se email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user) {
            throw new Error("User/Password incorrect")
        }
        //verificar se a senha esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("User/Password incorrect")
        }

        if (!user.ativo) {
            throw new Error("Conta desativada. Contate com o desenvolvedor.")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "7d"
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}