import { Request, Response } from "express";
import { IAuthService } from "../../services/interface/Iadmin";
import { IAuthController } from "../interface/IadminController";
import { AdminLoginRequestDto, AdminRefreshRequestDto } from "../../dto/admin";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: AdminLoginRequestDto = req.body;
      if (!email || !password) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Email and password are required" });
        return;
      }

      const tokens = await this.authService.login(email, password);
      if (!tokens) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password" });
        return;
      }

      res.status(HttpStatusCodes.OK).json(tokens);
    } catch (error) {
      console.error("Error in login:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken }: AdminRefreshRequestDto = req.body;
      if (!refreshToken) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Refresh token is required" });
        return;
      }

      const result = await this.authService.refreshToken(refreshToken);
      if (!result) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid or expired refresh token" });
        return;
      }

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
      console.error("Error in refresh:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
    }
  }
}