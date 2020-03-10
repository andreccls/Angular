export interface Meta<T> {
    _meta: {
        success: string;
        code: string;
        message: string;
        totalCount: number;
        pageCount: number;
        currentPage: number;
        perPage: number;
    };
    result: T[];
}