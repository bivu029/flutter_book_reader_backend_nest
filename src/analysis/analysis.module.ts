import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard/dashboard.service';
import { UserAnalyticsService } from './user-analytics/user-analytics.service';
import { BookAnalyticsService } from './book-analytics/book-analytics.service';

@Module({
  providers: [DashboardService, UserAnalyticsService, BookAnalyticsService]
})
export class AnalysisModule {}
