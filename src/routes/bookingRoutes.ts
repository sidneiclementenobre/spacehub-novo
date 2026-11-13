import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { BookingController } from '../controllers/bookingController';

const router = Router();

router.post('/reservas', authMiddleware as any, BookingController.createBooking);
router.get('/reservas/historico', authMiddleware as any, BookingController.listMyBookings);

export default router;
