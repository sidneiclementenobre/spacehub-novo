import { pool } from "../config/database";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4) RETURNING id, name, email, role;
    `;
    const values = [user.name, user.email, user.password, "guest"];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    return rows[0] || null;
  }
}
