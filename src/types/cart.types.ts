import { HydratedDocument, Types } from 'mongoose';

export interface CartItem {
    product: Types.ObjectId;
    quantity: number;
}

export interface ICart {
    user: Types.ObjectId;
    items: CartItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type CartDocument = HydratedDocument<ICart>;