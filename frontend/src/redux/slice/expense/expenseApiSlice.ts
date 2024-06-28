import { apiSlice } from '../../baseQuery';

export interface DailyExpenseInput {
    amount: number | undefined;
    name: string;
    description: string;
    date: any;
}

const expenseApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // getAllTags: build.query({
        //     query: (params: any) => ({
        //         url: `inventory/get-tags`
        //     }),
        //     transformResponse: (response: any) => response.data
        // }),
        // getInventoryDataTable: build.query({
        //     query: (params: any) => ({
        //         url: `inventory/?page=${params.currentPage}&limit=${params.rowLimit}&search_key=${params.searchKey}`
        //     }),
        //     transformResponse: (response: any) => response.data,
        //     providesTags: ['inventory']
        // }),
        createExpense: build.mutation({
            query: (payload: DailyExpenseInput) => ({
                url: `/inventory/create-new-inventory`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['expense'],
            transformResponse: (response: any) => response
        })
    })
});

export const {
    // useGetAllTagsQuery,
    // useGetInventoryDataTableQuery,
    useCreateExpenseMutation
} = expenseApiSlice;
