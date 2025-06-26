import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          // Use the dynamic query parameters provided by the caller
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        return {
          url: "auth/user-list",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getPendingRequest: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        return {
          url: "user/verification-status",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    acceptVerification: builder.mutation({
      query: ({ id }) => ({
        url: `user/confirm-profile-verification?userId=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    adminNotification: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        return {
          url: "notification",
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction", "user"],
    }),
    adminNotificationBadge: builder.query({
      query: () => ({
        url: "notification/badge-count",
        method: "GET",
      }),
    }),
    // New endpoint for manager approval/deny
    managerApproveDeny: builder.mutation({
      query: ({ id, status }) => ({
        url: `auth/approve-deny?id=${id}&status=${status}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    deleteAccount: builder.mutation({
      query: ({ id }) => ({
        url: `auth/account-delete?id=${id}`,
        method: "DELETE",
      }),
      providesTags: ["setting"],
    }),
    changeRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `admin/change-role/${userId}?role=${role}`,
        method: "POST",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetPendingRequestQuery,
  useAcceptVerificationMutation,
  useManagerApproveDenyMutation, // New hook for the approval/deny action
  useAdminNotificationQuery,
  useAdminNotificationBadgeQuery,
  useDeleteAccountMutation,
  useChangeRoleMutation,
} = usersApi;

export default usersApi;
