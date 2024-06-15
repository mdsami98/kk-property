import { apiSlice } from '../../baseQuery';

const inventoryApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllTags: build.query({
            query: (params: any) => ({
                url: `inventory/get-tags`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['member']
        })
    })
});

export const { useGetAllTagsQuery } = inventoryApiSlice;
