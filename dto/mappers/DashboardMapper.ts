import { DashboardStats } from "../../services/interface/Iadmin";
import { 
  DashboardStatsResponseDto, 
  MonthlyBookingDto, 
  CategoryStatDto 
} from "../admin/DashboardDto";

export class DashboardMapper {
  // Map DashboardStats domain model to DashboardStatsResponseDto
  static toDashboardStatsResponseDto(stats: DashboardStats): DashboardStatsResponseDto {
    return {
      totalUsers: stats.totalUsers,
      totalBookings: stats.totalBookings,
      totalListings: stats.totalListings,
      totalHosts: stats.totalHosts,
      usersGrowth: stats.usersGrowth,
      bookingsGrowth: stats.bookingsGrowth,
      listingsGrowth: stats.listingsGrowth,
      hostsGrowth: stats.hostsGrowth,
      monthlyBookings: this.toMonthlyBookingDtoArray(stats.monthlyBookings),
      bookingsByCategory: this.toCategoryStatDtoArray(stats.bookingsByCategory),
      listingsByCategory: this.toCategoryStatDtoArray(stats.listingsByCategory)
    };
  }

  // Map monthly booking data to DTO
  private static toMonthlyBookingDtoArray(monthlyBookings: Array<{ month: string; bookings: number }>): MonthlyBookingDto[] {
    return monthlyBookings.map(booking => ({
      month: booking.month,
      bookings: booking.bookings
    }));
  }

  // Map category stat data to DTO
  private static toCategoryStatDtoArray(categoryStats: Array<{ name: string; value: number }>): CategoryStatDto[] {
    return categoryStats.map(stat => ({
      name: stat.name,
      value: stat.value
    }));
  }
}
