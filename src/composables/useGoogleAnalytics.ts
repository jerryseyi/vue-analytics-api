import { ref, Ref } from "vue";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

export default function useGoogleAnalytics() {
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);

    const initializeAnalytics = async (apiKey: string, clientId: string) => {
        try {
            loading.value = true;
            await GoogleAnalytics.initialize(apiKey, clientId);
            loading.value = false;
        } catch (err) {
            error.value = 'Failed to initialize GoogleAnalytics';
            loading.value = false;
        }
    };

    const fetchPageReport = async (
        viewId: string,
        startDate: string,
        endDate: string,
        pagePath: string,
        metrics: string[]
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getPageReport(viewId, startDate, endDate, metrics, pagePath);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = `Failed to fetch report for page ${pagePath}`;
            console.error('Error fetching page report:', err);
            loading.value = false;
            throw err;
        }
    }

    const fetchAnalyticsData = async (
        viewId: string,
        startDate: string,
        endDate: string,
        metrics: string[],
        dimensions: string[] = []
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getReport(viewId, startDate, endDate, metrics, dimensions);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = 'Failed to fetch GoogleAnalytics';
            loading.value = false;
            throw err;
        }
    };

    const fetchVisitsByCountry = async (
        viewId: string,
        startDate: string,
        endDate: string,
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getVisitsByCountry(viewId, startDate, endDate, ['ga:sessions']);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = 'Failed to fetch Visits by country';
            loading.value = false;
            throw err;
        }
    };

    const fetchUniqueVisitsByCountry = async (
        viewId: string,
        startDate: string,
        endDate: string
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getUniqueVisitsByCountry(viewId, startDate, endDate);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = 'Failed to fetch unique visitors by country';
            console.error('Error fetching unique visitors by country:', err);
            loading.value = false;
            throw err;
        }
    };

    const fetchVisitsByCity = async (
        viewId: string,
        startDate: string,
        endDate: string
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getVisitsByCity(viewId, startDate, endDate, ['ga:sessions']);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = 'Failed to fetch visits by city';
            console.error('Error fetching visits by city:', err);
            loading.value = false;
            throw err;
        }
    };

    const fetchUniqueVisitsByCity = async (
        viewId: string,
        startDate: string,
        endDate: string
    ) => {
        try {
            loading.value = true;
            const data = await GoogleAnalytics.getUniqueVisitsByCity(viewId, startDate, endDate);
            loading.value = false;
            return data;
        } catch (err) {
            error.value = 'Failed to fetch unique visitors by city';
            console.error('Error fetching unique visitors by city:', err);
            loading.value = false;
            throw err;
        }
    };

    return {
        loading,
        error,
        initializeAnalytics,
        fetchAnalyticsData,
        fetchVisitsByCountry,
        fetchUniqueVisitsByCountry,
        fetchVisitsByCity,
        fetchUniqueVisitsByCity,
        fetchPageReport
    }
}