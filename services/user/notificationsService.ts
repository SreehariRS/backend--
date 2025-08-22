import {
    INotificationsService,
    DeleteNotificationParams,
    GetNotificationsParams,
    CreateNotificationParams,
} from "../interface/Iuser";
import { INotificationsRepository } from "../../repositories/interface/IUserRepositories";
import { NotificationsMapper } from "../../dto/mappers/user/NotificationsMapper";

export class NotificationsService implements INotificationsService {
    private notificationsRepository: INotificationsRepository;

    constructor(notificationsRepository: INotificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }

    async getNotificationCount(userId: string): Promise<number> {
        if (!userId) throw new Error("User ID is required.");
        const count = await this.notificationsRepository.getNotificationCount(userId);
        return NotificationsMapper.toNotificationCountResponseDto(count).count;
    }

    async deleteNotification(params: DeleteNotificationParams): Promise<any> {
        return await this.notificationsRepository.deleteNotification(params);
    }

    async getNotifications(params: GetNotificationsParams): Promise<any> {
        const notifs = await this.notificationsRepository.getNotifications(params);
        return notifs.map(NotificationsMapper.toNotificationDto);
    }

    async createNotification(params: CreateNotificationParams): Promise<any> {
        const notif = await this.notificationsRepository.createNotification(params);
        return NotificationsMapper.toNotificationDto(notif);
    }
}
