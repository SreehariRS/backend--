import { PaginatedResponse } from "../../services/interface/Iadmin";
import { 
  HostResponseDto, 
  HostListResponseDto 
} from "../admin/HostDto";

// Host domain model interface for internal use
interface Host {
  id: string;
  name: string;
  listingCount: number;
  isRestricted: boolean;
}

export class HostMapper {
  // Map Host domain model to HostResponseDto
  static toHostResponseDto(host: Host): HostResponseDto {
    return {
      id: host.id,
      name: host.name,
      listingCount: host.listingCount,
      isRestricted: host.isRestricted
    };
  }

  // Map multiple Host domain models to HostResponseDto array
  static toHostResponseDtoArray(hosts: Host[]): HostResponseDto[] {
    return hosts.map(host => this.toHostResponseDto(host));
  }

  // Map PaginatedResponse<Host> to HostListResponseDto
  static toHostListResponseDto(paginatedHosts: PaginatedResponse<Host>): HostListResponseDto {
    return {
      data: this.toHostResponseDtoArray(paginatedHosts.data),
      total: paginatedHosts.total,
      currentPage: paginatedHosts.currentPage,
      totalPages: paginatedHosts.totalPages
    };
  }
}
