import { apiSlice } from '../../baseQuery';

const userApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMemberDataTable: build.query({
            query: (params: any) => ({
                url: `/member/list?page=${params.currentPage}&limit=${params.rowLimit}&search_key=${params.searchKey}&status=${params.status}`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['member']
        })
    })
});

export const { useGetMemberDataTableQuery } = userApiSlice;
