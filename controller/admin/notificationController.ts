import { Request, Response } from "express";
import { INotificationService } from "../../services/interface/Iadmin";
import { HttpStatusCodes } from "../../config/HttpStatusCodes";

export class NotificationController {
  private notificationService: INotificationService;

  constructor(notificationService: INotificationService) {
    this.notificationService = notificationService;
  }

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      const { userId, message, type } = req.body;
      if (!userId || !message || !type) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
        return;
      }
      await this.notificationService.sendNotification(userId, message, type);
      res.status(HttpStatusCodes.OK).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to send notification" });
    }
  }
}