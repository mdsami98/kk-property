import { apiSlice } from '../../baseQuery';

const projectApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllInvestorsForProjectCreate: build.query({
            query: (params: any) => ({
                url: `/project/get-investor-for-project`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['member']
        }),
        projectCreate: build.mutation({
            query: (param: any) => ({
                url: `/project`,
                method: 'POST',
                body: param
            }),
            transformResponse: (response, meta, arg) => response
        }),
        getProjectDataTable: build.query({
            query: (params: any) => ({
                url: `project/?page=${params.currentPage}&limit=${params.rowLimit}&search_key=${params.searchKey}&status=${params.status}`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['member']
        }),
        getProject: build.query({
            query: (params: any) => ({
                url: `/project/${params.id}`
            }),
            transformResponse: (response: any) => response.data,
        }),
    })
});

export const {
    useGetAllInvestorsForProjectCreateQuery,
    useProjectCreateMutation,
    useGetProjectDataTableQuery,
    useGetProjectQuery
} = projectApiSlice;
