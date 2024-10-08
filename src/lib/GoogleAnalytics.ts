import {loadGapiInsideDOM} from "gapi-script";
import type {GoogleAnalyticsInterface} from "@/lib/types/GoogleAnalyticsInterface";
import type {GAReportResponse} from "@/lib/types/GoogleAnayticsTypes";

const GoogleAnalytics: GoogleAnalyticsInterface = {

    initialize(apiKey: string, clientId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            loadGapiInsideDOM().then(() => {
                window.gapi.load('client:auth2', () => {
                    window.gapi.client
                        .init({
                            apiKey: apiKey,
                            clientId: clientId,
                            scope: 'https://www.googleapis.com/auth/analytics.readonly',
                            discoveryDocs: [
                                'https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'
                            ]
                        }).then(() => {
                        window.gapi.client('analytics', 'v3');
                        resolve();
                    })
                        .catch(err => reject(err));
                });
            });
        });
    },

    async getReport(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        dimensions: string[] = [],
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
                ids: `ga:${viewId}`,
                'start-date': startDate,
                'end-date': endDate,
                metrics: metrics.join(','),
                dimensions: dimensions.join(','),
            });

            return response.result;
        } catch (error) {
            console.error('Error Fetching Analytics Data', error);
            throw error;
        }
    },

    /*
    * Fetches result from Google Analytics for a specific page path.
    * */
    async getPageReport(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        pagePath: string
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
                ids: `ga:${viewId}`,
                'start-date': startDate,
                'end-date': endDate,
                metrics: metrics.join(','),
                dimensions: 'ga:pagePath',
                filters: `ga:pagePath==${pagePath}`
            });

            return response.result;
        } catch (err) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    },

    async getVisitsByCountry(
        viewId: string,
        startDate: string,
        endDate: string,
        metric: string[]
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
                ids: `ga:${viewId}`,
                'start-date': startDate,
                'end-date': endDate,
                metrics: metric.join(','),
                dimensions: 'ga:country'
            });

            return response.result;
        } catch (err) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    },

    async getUniqueVisitsByCountry(
        viewId: string,
        startDate: string,
        endDate: string
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
                ids: `ga:${viewId}`,
                'start-date': startDate,
                'end-date': endDate,
                metrics: 'ga:users',
                dimensions: 'ga:country'
            });

            return response.results;
        } catch (err) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    },

    async getVisitsByCity(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[]
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
                ids: `ga:${viewId}`,
                'start-date': startDate,
                'end-date': endDate,
                metrics: metrics.join(','),
                dimensions: 'ga:city'
            });
            
            return response.result;
        } catch (err) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    },

    async getUniqueVisitsByCity(
        viewId: string,
        startDate: string,
        endDate: string
    ): Promise<GAReportResponse> {
        try {
            const response = await window.gapi.client.analytics.data.ga.get({
               ids: `ga:${viewId}`,
               'start-date': startDate,
               'end-date': endDate,
                metrics: 'ga:users',
                dimensions: 'ga:city'
            });

            return response.result;
        } catch (err) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    }
};


export default GoogleAnalytics;