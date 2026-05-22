import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

interface UpdatePasswordRequest {
  user_id: string;
  current_password: string;
  new_password: string;
}

class UpdatePasswordService {
  async execute({
    user_id,
    current_password,
    new_password,
  }: UpdatePasswordRequest) {
    if (!current_password || !new_password) {
      throw new Error("Current password and new password are required");
    }

    if (new_password.length < 6) {
      throw new Error("New password must be at least 6 characters");
    }

    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(current_password, user.password);

    if (!passwordMatch) {
      throw new Error("Current password incorrect");
    }

    const passwordHash = await hash(new_password, 8);

    await prismaClient.user.update({
      where: { id: user_id },
      data: {
        password: passwordHash,
        updated_at: new Date(),
      },
    });

    return { message: "Password updated successfully" };
  }
}

export { UpdatePasswordService };
