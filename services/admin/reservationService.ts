
import { IReservationRepository } from "../../repositories/interface/IadminRepositories";
import { IReservationService, Reservation, PaginatedResponse } from "../interface/Iadmin";
import { ReservationMapper } from "../../dto/mappers";

export default class ReservationService implements IReservationService {
  private reservationRepository: IReservationRepository;

  constructor(reservationRepository: IReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async getAllReservations(page: number, limit: number): Promise<import("../../dto/admin").ReservationListResponseDto> {
    const paginatedReservations = await this.reservationRepository.getAllReservations(page, limit);
    // Use DTO mapper to return properly formatted response
    return ReservationMapper.toReservationListResponseDto(paginatedReservations);
  }
}