import GoogleAnalytics from "@/lib/GoogleAnalytics";
import useGoogleAnalytics from "@/composables/useGoogleAnalytics";

export {GoogleAnalytics, useGoogleAnalytics};

export default {
    install: (app: any, options: { apiKey: string, clientId: string }) => {
        const {apiKey, clientId} = options;

        if (!apiKey || !clientId) {
            console.error('Google Analytics: API key and Client ID are required');
            return;
        }

        app.provide('gaApiKey', apiKey);
        app.provide('gaClientId', clientId);

        GoogleAnalytics.initialize(apiKey, clientId)
            .then(() => {
                console.log('Google Analytics initialized globally.');
            })
            .catch((err) => {
                console.error('Google Analytics global initialization failed:', err);
            })
    }
};