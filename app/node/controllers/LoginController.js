// controllers/LoginController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const login = async (req, res) => {
    const { email, contrasenha } = req.body;

    if (!email || !contrasenha) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    try {
        console.log("Email recibido:", email);
        console.log("Contraseña recibida:", contrasenha);

        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario inválido' });
        }

        const validPassword = await bcrypt.compare(contrasenha, user.contrasenha);

        console.log('Password Match:', validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Incluir el nombre del usuario en el token
        const token = jwt.sign(
            { id: user.id, nombreComp: user.nombreComp }, 
            process.env.JWT_SECRET || 'tu_secreto_jwt',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
        console.log(user.nombreComp);
        res.json({ token });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

