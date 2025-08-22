import { Request, Response } from "express";
import { IUserService } from "../../services/interface/Iadmin";
import { IUserController } from "../interface/IadminController";
import { UserSearchQueryDto } from "../../dto/admin";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;
      const searchQuery = req.query.search as string | undefined;
      
      const queryParams: UserSearchQueryDto = { page, limit, searchQuery };
      const paginatedData = await this.userService.getAllUsers(
        queryParams.page, 
        queryParams.limit, 
        queryParams.searchQuery
      );
      res.status(HttpStatusCodes.OK).json(paginatedData);
    } catch (error) {
      let errorMessage = "An unexpected error occurred while fetching users";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }

  async blockUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User ID is required" });
        return;
      }
      
      const user = await this.userService.blockUser(userId);
      if (!user) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      res.status(HttpStatusCodes.OK).json({ message: "User blocked successfully", user });
    } catch (error) {
      let errorMessage = "An unexpected error occurred while blocking the user";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }

  async unblockUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User ID is required" });
        return;
      }
      
      const user = await this.userService.unblockUser(userId);
      if (!user) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      res.status(HttpStatusCodes.OK).json({ message: "User unblocked successfully", user });
    } catch (error) {
      let errorMessage = "An unexpected error occurred while unblocking the user";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }

  async restrictHost(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User ID is required" });
        return;
      }
      
      const user = await this.userService.restrictHost(userId);
      if (!user) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Host not found" });
        return;
      }
      res.status(HttpStatusCodes.OK).json({ message: "Host restricted from listing", user });
    } catch (error) {
      let errorMessage = "An unexpected error occurred while restricting the host";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }

  async unrestrictHost(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User ID is required" });
        return;
      }
      
      const user = await this.userService.unrestrictHost(userId);
      if (!user) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Host not found" });
        return;
      }
      res.status(HttpStatusCodes.OK).json({ message: "Host unrestricted from listing", user });
    } catch (error) {
      let errorMessage = "An unexpected error occurred while unrestricting the host";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }
}