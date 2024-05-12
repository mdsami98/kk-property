import { apiSlice } from '../../baseQuery';

const authAliSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: `/schema/`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response) => response
        })
    })
});

export const { useLoginMutation } = authAliSlice;
