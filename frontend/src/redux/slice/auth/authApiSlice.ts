import {
    setOtherCookie,
    setCookie,
    setCookieForRefresh
} from '@/helpers/Cookie';
import { apiSlice } from '../../baseQuery';

const authAliSlice: any = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (payload: { email: string; password: string }) => ({
                url: `/auth/login`,
                method: 'POST',
                body: payload
            }),
            transformResponse: (response: any) => response,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // `onStart` side-effect

                try {
                    const { data } = await queryFulfilled;
                    console.log(data, 'data');

                    if (data.status) {
                        setCookie(
                            'access_token',
                            data.tokens.access.token,
                            '1 hour'
                        );
                        setCookieForRefresh(
                            'refresh_token',
                            data.tokens.refresh.token
                        );
                    }
                } catch (err) {
                    console.log(err);
                    // `onError` side-effect
                }
            }
        }),
        getUser: build.query({
            query: () => '/auth/user'
        })
    })
});

export const { useLoginMutation, useGetUserQuery } = authAliSlice;
