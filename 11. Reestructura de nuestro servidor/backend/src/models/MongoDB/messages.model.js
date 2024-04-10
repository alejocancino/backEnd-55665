import { Schema, model } from "mongoose";

const messagesModel = new Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    postTime: {
        type: String, 
        default: () => {
            const fechaActual = new Date(Date.now());
            const year = fechaActual.getFullYear();
            const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const day = String(fechaActual.getDate()).padStart(2, '0');
            const hour = String(fechaActual.getHours()).padStart(2, '0');
            const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hour}:${minutes}`;
        }
    }
});

export const MessagesModel = model('messages', messagesModel)