import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
      });

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return res.status(500).json({ error: 'Erro interno ao cadastrar usuário.' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      const secret = process.env.JWT_SECRET || 'segredo_super_seguro_spacehub_123';
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

      return res.status(200).json({
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
  }
}
