import { apiSlice } from '../../baseQuery';

const projectApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllInvestorsForProjectCreate: build.query({
            query: (params: any) => ({
                url: `/project/get-investor-for-project`
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['member']
        })
    })
});

export const { useGetAllInvestorsForProjectCreateQuery } = projectApiSlice;
