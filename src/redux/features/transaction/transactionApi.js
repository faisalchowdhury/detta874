import { baseApi } from "../../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "purchase/history",
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction"],
    }),
    getWithdrawRequest: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "withdraw",
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction"],
    }),
    payment: builder.mutation({
      query: ({ id }) => ({
        url: `withdraw/accept?withdrawId=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    earningChart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "user/dashboard-earning-charts",
          method: "GET",
          params,
        };
      },
      providesTags: ["user", "transaction"],
    }),
    dashboardStatus: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `auth/dashboard-user-stats?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["user", "transaction"],
    }),
    transactionChart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "user/dashboard-transaction-charts",
          method: "GET",
          params,
        };
      },
      providesTags: ["user", "transaction"],
    }),

    // New eventChart endpoint.
    eventChart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `auth/dashboard-event-stats?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["user", "transaction"],
    }),
    // New overallStats endpoint.
    overallStats: builder.query({
      query: () => ({
        url: "auth/dashboard-overall-stats",
        method: "GET",
      }),
      providesTags: ["user", "transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetWithdrawRequestQuery,
  usePaymentMutation,
  useDashboardStatusQuery,
  useEventChartQuery,
  useOverallStatsQuery,
  useEarningChartQuery,
  useTransactionChartQuery,
} = transactionApi;
