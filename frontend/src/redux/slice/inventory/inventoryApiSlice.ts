import { apiSlice } from '../../baseQuery';

export interface InventoryInput {
    name: string;
    pcode: string;
    quantity: number;
    unit_price: number;
    tags: (number | string)[];
    description?: string;
}

const inventoryApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllTags: build.query({
            query: (params: any) => ({
                url: `inventory/get-tags`
            }),
            transformResponse: (response: any) => response.data
        }),
        getInventoryDataTable: build.query({
            query: (params: any) => ({
                url: `inventory/?page=${params.currentPage}&limit=${params.rowLimit}&search_key=${params.searchKey}`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['inventory']
        }),
        createInventory: build.mutation({
            query: (payload: InventoryInput) => ({
                url: `/inventory/create-new-inventory`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['inventory'],
            transformResponse: (response: any) => response
        })
    })
});

export const {
    useGetAllTagsQuery,
    useGetInventoryDataTableQuery,
    useCreateInventoryMutation
} = inventoryApiSlice;
