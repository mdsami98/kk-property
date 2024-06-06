import {
    setOtherCookie,
    setCookie,
    setCookieForRefresh
} from '@/helpers/Cookie';
import { apiSlice } from '../../baseQuery';
import { setCredentials } from './authSlice';
interface MemberFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    memberType: number;
}
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
                    dispatch(setCredentials({ user: data.data } as any));

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
        }),
        addMemberByAdmin: build.mutation({
            query: (payload: MemberFormData) => ({
                url: `/auth/member-add`,
                method: 'POST',
                body: payload
            }),
            transformResponse: (response: any) => response
        })
    })
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useAddMemberByAdminMutation
} = authAliSlice;
