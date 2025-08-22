import { Response } from "express";
import { IPaymentService } from "../interface/Iuser";
import { IPaymentRepository } from "../../repositories/interface/IUserRepositories";
import { PaymentsMapper } from "../../dto/mappers/user/PaymentsMapper";

export class PaymentService implements IPaymentService {
    private paymentRepository: IPaymentRepository;

    constructor(paymentRepository: IPaymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    async createOrder(body: { amount: number; currency?: string }, res: Response): Promise<void> {
        const options = {
            amount: body.amount * 100,
            currency: body.currency || "INR",
            receipt: `txn_${Date.now()}`,
            payment_capture: 1,
        };
        const order = await this.paymentRepository.createOrder(options);
        const dto = PaymentsMapper.toCreateOrderResponseDto(order);
        res.status(200).json(dto);
    }
}
