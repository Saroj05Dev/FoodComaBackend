import { HydratedDocument } from "mongoose";

export type Category = 
    | "Veg"
    |"Non-Veg"
    |"Drink"
    |"Sides";

export interface IProduct {
    title: string;
    description?: string;
    price: number;
    category: Category;
    inStock: boolean;
    image: string;
    imagePublicId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductDocument = HydratedDocument<IProduct>;

export interface CreateProductDto {
    title: string;
    description?: string;
    price: number;
    category: Category;
    quantity: number;
    inStock: boolean;
}