import { IProfileService } from "../interface/Iuser";
import { IProfileRepository } from "../../repositories/interface/IUserRepositories";
import { ProfileMapper } from "../../dto/mappers/user/ProfileMapper";

export class ProfileService implements IProfileService {
    private profileRepository: IProfileRepository;

    constructor(profileRepository: IProfileRepository) {
        this.profileRepository = profileRepository;
    }

    async findByEmail(email: string): Promise<any> {
        const user = await this.profileRepository.findByEmail(email);
        return user ? ProfileMapper.toUserProfileDto(user) : null;
    }

    async updateProfileImage(userId: string, imageUrl: string): Promise<any> {
        if (!userId || !imageUrl) {
            throw new Error("User ID and Image URL are required.");
        }
        const updated = await this.profileRepository.updateProfileImage(userId, imageUrl);
        return ProfileMapper.toUserProfileDto(updated);
    }

    async updateAbout(userId: string, about: string): Promise<any> {
        if (!userId || !about) {
            throw new Error("User ID and About text are required.");
        }
        const updated = await this.profileRepository.updateAbout(userId, about);
        return ProfileMapper.toUserProfileDto(updated);
    }
}
