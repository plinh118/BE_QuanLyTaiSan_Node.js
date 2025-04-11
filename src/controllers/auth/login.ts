import  { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'pham-thanh-long-2003004';

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ 
            errorCode: 5,
            message: 'Email and password are required'
          });
        }
    
        const users = await executeQuery<any[]>(
          'SELECT * FROM users WHERE email = ?',
          [email]
        );
    
        const user = users[0];
        if (!user) {
          return res.status(401).json({
            errorCode: 6,
            message: 'Invalid email or password'
          });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
          return res.status(401).json({
            errorCode: 7,
            message: 'Invalid email or password'
          });
        }
    
        const token = jwt.sign(
          { id: user.Id, email: user.Email, role: user.Role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
    
        res.json({
          message: 'Đăng nhập thành công',
          token,
          errorCode: 0,
          user: {
            id: user.Id,
            email: user.Email,
            role: user.Role,
            fullName: user.FullName,
          },
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
          errorCode: 8,
          message: 'Internal server error'
        });
      }
  
};
