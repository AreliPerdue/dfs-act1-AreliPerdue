import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Registro de usuario
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario nuevo
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
    res.status(400).json({ message: 'Error al registrar usuario', error: error.message });
    }
};
// Login de usuario
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    // Generar token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });

    res.json({ token });
    } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
    }
};
