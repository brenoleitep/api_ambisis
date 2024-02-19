import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Interface para definir a estrutura do token decodificado para a entidade Company
interface CompanyDecoded {
  // Defina aqui as propriedades que você espera que estejam no token decodificado para a entidade Company
  companyId: number; // Exemplo de propriedade
}

declare module 'express' {
  interface Request {
    company?: CompanyDecoded;
  }
}


export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, 'segredo', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na verificação do token de autenticação.' });
    }
    req.company = decoded as CompanyDecoded;
    next();
  });
}
