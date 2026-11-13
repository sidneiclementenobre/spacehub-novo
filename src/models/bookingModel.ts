import { pool } from "../config/database";

export interface Booking {
  id?: number;
  user_id: number;
  space_id: number;
  check_in: string;
  check_out: string;
  total_price?: number;
}

export class BookingModel {
  static async create(booking: Booking): Promise<Booking> {
    const query = `
      INSERT INTO bookings (guest_id, space_id, check_in, check_out )
      VALUES ($1, $2, $3, $4 ) RETURNING *;
    `;
    const values = [
      booking.user_id,
      booking.space_id,
      booking.check_in,
      booking.check_out,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUserId(userId: number) {
    const query = `
      SELECT 
        b.id, 
        b.check_in, 
        b.check_out, 
        s.price_per_night AS total_price,
        s.title AS space_title, 
        s.image_url AS space_image
      FROM bookings b
      JOIN spaces s ON b.space_id = s.id
      WHERE b.guest_id = $1
      ORDER BY b.id DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
}
