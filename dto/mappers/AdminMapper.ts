import { Admin } from "../../services/interface/Iadmin";
import { 
  AdminResponseDto, 
  AdminLoginResponseDto, 
  AdminRefreshResponseDto 
} from "../admin/AdminDto";

export class AdminMapper {
  // Map Admin domain model to AdminResponseDto
  static toAdminResponseDto(admin: Admin): AdminResponseDto {
    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      accessToken: admin.accessToken,
      refreshToken: admin.refreshToken
    };
  }

  // Map Admin domain model to AdminLoginResponseDto
  static toAdminLoginResponseDto(
    admin: Admin, 
    accessToken: string, 
    refreshToken: string
  ): AdminLoginResponseDto {
    return {
      message: "Login successful",
      accessToken,
      refreshToken
    };
  }

  // Map Admin domain model to AdminRefreshResponseDto
  static toAdminRefreshResponseDto(accessToken: string): AdminRefreshResponseDto {
    return {
      message: "Token refreshed",
      accessToken
    };
  }

  // Map multiple Admin domain models to AdminResponseDto array
  static toAdminResponseDtoArray(admins: Admin[]): AdminResponseDto[] {
    return admins.map(admin => this.toAdminResponseDto(admin));
  }
}
