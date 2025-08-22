import { Request, Response } from "express";
import { IDashboardService } from "../../services/interface/Iadmin";
import { IDashboardController } from "../interface/IadminController";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class DashboardController implements IDashboardController {
  private dashboardService: IDashboardService;

  constructor(dashboardService: IDashboardService) {
    this.dashboardService = dashboardService;
  }

  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.dashboardService.getDashboardStats();
      res.status(HttpStatusCodes.OK).json(stats);
    } catch (error) {
      let errorMessage = "An unexpected error occurred while fetching dashboard stats";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error details:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }
}