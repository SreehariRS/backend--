import { Reservation, PaginatedResponse } from "../../services/interface/Iadmin";
import { 
  ReservationResponseDto, 
  ReservationListResponseDto 
} from "../admin/ReservationDto";

export class ReservationMapper {
  // Map Reservation domain model to ReservationResponseDto
  static toReservationResponseDto(reservation: Reservation): ReservationResponseDto {
    return {
      id: reservation.id,
      guestName: reservation.guestName,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      hostName: reservation.hostName,
      propertyName: reservation.propertyName
    };
  }

  // Map multiple Reservation domain models to ReservationResponseDto array
  static toReservationResponseDtoArray(reservations: Reservation[]): ReservationResponseDto[] {
    return reservations.map(reservation => this.toReservationResponseDto(reservation));
  }

  // Map PaginatedResponse<Reservation> to ReservationListResponseDto
  static toReservationListResponseDto(paginatedReservations: PaginatedResponse<Reservation>): ReservationListResponseDto {
    return {
      data: this.toReservationResponseDtoArray(paginatedReservations.data),
      total: paginatedReservations.total,
      currentPage: paginatedReservations.currentPage,
      totalPages: paginatedReservations.totalPages
    };
  }
}
