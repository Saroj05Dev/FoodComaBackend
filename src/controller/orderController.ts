import { createOrderService, fetchOrdersByUserIdService, fetchOrderByIdService, updateOrderService } from "../service/orderService";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";

export async function createOrder(req: Request, res: Response): Promise<Response> {
    try {
        const userId = req.user!.id;

        const order = await createOrderService(userId, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: "Successfully created the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

export async function FetchAllOrdersCreatedByUser(req: Request, res: Response): Promise<Response> {
    try {
        const userId = req.user!.id;

        const order = await fetchOrdersByUserIdService(userId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

export async function FetchOrderById(req: Request, res: Response): Promise<Response> {
    try {
        const orderId = req.params.orderId as string;

        const order = await fetchOrderByIdService(orderId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

export async function cancelOrder(req: Request, res: Response): Promise<Response> {
    try {
        const orderId = req.params.orderId as string;

        const order = await updateOrderService(orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

export async function changeOrderStatus(req: Request, res: Response): Promise<Response> {
    try {
        const orderId = req.params.orderId as string;
        const status = req.body.status;

        const order = await updateOrderService(orderId, status);
        return res.status(200).json({
            success: true,
            message: "Successfully updated the status of order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}
