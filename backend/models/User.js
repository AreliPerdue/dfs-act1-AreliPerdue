import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// 👇 Aquí está la clave: exportar como default
const User = mongoose.model('User', userSchema);

export default User;
