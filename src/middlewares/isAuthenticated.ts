import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IPayload {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    const user = await prismaClient.user.findFirst({
      where: { id: sub },
      select: { ativo: true },
    });

    if (!user || !user.ativo) {
      return res.status(403).json({
        error: "Conta desativada. Contate com o desenvolvedor.",
      });
    }

    req.user_id = sub;
    return next();
  } catch {
    return res.status(401).end();
  }
}
