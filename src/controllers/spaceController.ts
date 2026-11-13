import { Request, Response } from 'express';
import { SpaceModel } from '../models/spaceModel';

export class SpaceController {
  static async createSpace(req: Request, res: Response) {
    try {
      const { title, description, price_per_night, image_url } = req.body;
      const newSpace = await SpaceModel.create({
        title,
        description,
        price_per_night,
        image_url
      });
      return res.status(201).json(newSpace);
    } catch (error) {
      console.error('Erro ao criar espaço:', error);
      return res.status(500).json({ error: 'Erro interno ao cadastrar o espaço.' });
    }
  }

  static async listSpaces(req: Request, res: Response) {
    try {
      const spaces = await SpaceModel.getAll();
      return res.status(200).json(spaces);
    } catch (error) {
      console.error('Erro ao listar espaços:', error);
      return res.status(500).json({ error: 'Erro interno no servidor ao listar os espaços.' });
    }
  }
}
