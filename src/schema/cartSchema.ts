import mongoose, { Schema } from 'mongoose';
import { ICart } from '../types/cart.types';


const cartSchema = new Schema<ICart>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
}, {
    timestamps: true
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;