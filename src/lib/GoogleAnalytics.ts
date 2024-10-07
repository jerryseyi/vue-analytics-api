import { loadGapiInsideDOM } from "gapi-script";

type GAReportResponse = gapi.client.analytics.GaData;

interface GoogleAnalytics {
    initialize(trackingId: string): Promise<void>;
    getReport(
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        dimensions?: string[],
    ): Promise<GAReportResponse>;
}

const GoogleAnalytics: GoogleAnalytics = {

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
                "start-date": startDate,
                "end-date": endDate,
                metrics: metrics.join(','),
                dimensions: dimensions.join(','),
            });

            return response.result;
        } catch (error) {
            console.error('Error Fetching Analytics Data', error);
            throw error;
        }
    },

};


export default GoogleAnalytics;