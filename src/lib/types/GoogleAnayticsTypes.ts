export interface GAReportResponse {
    kind: string;
    id: string;
    query: {
        'start-date': string;
        'end-date': string;
        ids: string;
        metrics: string[];
        dimensions?: string[];
        filters?: string;
    };
    itemsPerPage: number;
    columnHeaders: Array<{
        name: string;
        columnType: string;
        dataType: string;
    }>;
    totalsForAllResults: {
        [key: string]: string;
    };
    rows: string[][];
    totalResults: number;
}
