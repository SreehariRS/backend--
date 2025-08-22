import { Request, Response } from "express";
import { IPaymentService } from "../../services/interface/Iuser";
import { IPaymentController } from "../interface/IuserController";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class PaymentController implements IPaymentController {
    private paymentService: IPaymentService;

    constructor(paymentService: IPaymentService) {
        this.paymentService = paymentService;
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            await this.paymentService.createOrder(req.body, res);
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create order" });
        }
    }
}
