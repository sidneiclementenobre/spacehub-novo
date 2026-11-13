import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { BookingModel } from '../models/bookingModel';

export class BookingController {
  static async createBooking(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { space_id, check_in, check_out, total_price } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const booking = await BookingModel.create({
        user_id: userId,
        space_id,
        check_in,
        check_out,
        total_price
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      return res.status(500).json({ error: 'Erro interno ao realizar a reserva.' });
    }
  }

  static async listMyBookings(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const bookings = await BookingModel.findByUserId(userId);
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Erro ao listar reservas:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar histórico de reservas.' });
    }
  }
}
