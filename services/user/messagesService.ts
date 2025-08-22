import { IMessagesService, CreateMessageParams, MarkMessageAsSeenParams } from "../interface/Iuser";
import { IMessagesRepository } from "../../repositories/interface/IUserRepositories";
import { MessagesMapper } from "../../dto/mappers/user/MessagesMapper";

export class MessagesService implements IMessagesService {
    private messagesRepository: IMessagesRepository;

    constructor(messagesRepository: IMessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async createMessage(params: CreateMessageParams): Promise<any> {
        const message = await this.messagesRepository.createMessage(params);
        return MessagesMapper.toMessageDto(message);
    }

    async updateConversationLastMessage(conversationId: string, messageId: string): Promise<any> {
        return await this.messagesRepository.updateConversationLastMessage(conversationId, messageId);
    }

    async markMessageAsSeen(params: MarkMessageAsSeenParams): Promise<any> {
        const updated = await this.messagesRepository.markMessageAsSeen(params);
        return updated;
    }
}
