import { User, PaginatedResponse } from "../../services/interface/Iadmin";
import { 
  UserResponseDto, 
  UserListResponseDto, 
  UserBlockResponseDto 
} from "../admin/UserDto";

export class UserMapper {
  // Map User domain model to UserResponseDto
  static toUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
      isRestricted: user.isRestricted,
      image: user.image
    };
  }

  // Map multiple User domain models to UserResponseDto array
  static toUserResponseDtoArray(users: User[]): UserResponseDto[] {
    return users.map(user => this.toUserResponseDto(user));
  }

  // Map PaginatedResponse<User> to UserListResponseDto
  static toUserListResponseDto(paginatedUsers: PaginatedResponse<User>): UserListResponseDto {
    return {
      data: this.toUserResponseDtoArray(paginatedUsers.data),
      total: paginatedUsers.total,
      currentPage: paginatedUsers.currentPage,
      totalPages: paginatedUsers.totalPages
    };
  }

  // Map User domain model to UserBlockResponseDto
  static toUserBlockResponseDto(user: User, action: string): UserBlockResponseDto {
    return {
      message: `User ${action} successfully`,
      user: this.toUserResponseDto(user)
    };
  }
}
