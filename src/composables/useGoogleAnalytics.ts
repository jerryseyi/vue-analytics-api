import { ref, Ref } from "vue";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

export default function useGoogleAnalytics() {
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);

    const initializeAnalytics = async (apiKey: string, clientId: string): Promise<void> => {
        try {
            loading.value = true;
            await GoogleAnalytics.initialize(apiKey, clientId);
            loading.value = false;
        } catch (err) {
            error.value = 'Failed to initialize GoogleAnalytics';
            loading.value = false;
        }
    };

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

    return {
        loading,
        error,
        initializeAnalytics,
        fetchAnalyticsData
    }
}