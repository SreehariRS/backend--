import { Request, Response } from "express";
import { IPasswordService } from "../../services/interface/Iuser";
import { IPasswordController } from "../interface/IuserController";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class PasswordController implements IPasswordController {
    private passwordService: IPasswordService;

    constructor(passwordService: IPasswordService) {
        this.passwordService = passwordService;
    }

    async changePassword(req: Request, res: Response): Promise<Response> {
        const { currentPassword, newPassword } = req.body;
        const userId = (req as any).user.userId;
        if (!userId || !currentPassword || !newPassword) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ error: "Current password and new password are required." });
        }
        try {
            const user = await this.passwordService.changePassword(userId, currentPassword, newPassword);
            return res
                .status(HttpStatusCodes.OK)
                .json({ status: true, message: "Password updated successfully.", data: user });
        } catch (error: any) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Email is required" });
            }
            const message = await this.passwordService.forgotPassword(email);
            return res.status(HttpStatusCodes.OK).json({ message });
        } catch (error: unknown) {
            console.error("Error in forgotPassword:", error);
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Something went wrong. Please try again." });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<Response> {
        try {
            const { token, password } = req.body;
            if (!token || !password) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Token and password are required" });
            }
            const message = await this.passwordService.resetPassword(token, password);
            return res.status(HttpStatusCodes.OK).json({ message });
        } catch (error: unknown) {
            console.error("Error in resetPassword:", error);
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Something went wrong. Please try again." });
        }
    }
}
