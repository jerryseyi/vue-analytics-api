import { GAReportResponse } from "@/lib/types/GoogleAnayticsTypes";

export interface GoogleAnalyticsInterface {

    initialize(trackingId: string): Promise<void>;

    getReport(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        dimensions?: string[],
    ): Promise<GAReportResponse>;

    getPageReport(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        pagePath: string
    ): Promise<GAReportResponse>;

    getVisitsByCountry(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[]
    ): Promise<GAReportResponse>;

    getUniqueVisitsByCountry(
        viewId: string,
        startDate: string,
        endDate: string
    ): Promise<GAReportResponse>;

    getVisitsByCity(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[]
    ): Promise<GAReportResponse>;

    getUniqueVisitsByCity(
        viewId: string,
        startDate: string,
        endDate: string
    ): Promise<GAReportResponse>;

}