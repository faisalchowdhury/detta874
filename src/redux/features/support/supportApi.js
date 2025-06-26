import { baseApi } from "../../api/baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `user/support-reports`,
          method: "GET",
          params,
        };
      },
      providesTags: ["support"],
    }),
    getChatUsersByToken: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `chat/list`,
          method: "GET",
          params,
        };
      },
      // providesTags: [],
    }),
    getChatList: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `chat/message`,
          method: "GET",
          params,
        };
      },
      // providesTags: ["chat"],
    }),
    sendMessage: builder.mutation({
      query: ({ id, body }) => ({
        url: `chat/create-message-with-file?chatId=${id}`,
        method: "POST",
        body: body,
      }),
      // invalidatesTags: ["chat"],
    }),
    getSupports: builder.query({
      query: () => {
        return {
          url: "/support",
          method: "GET",
        };
      },
      providesTags: ["setting"],
    }),
    getReports: builder.query({
      query: () => {
        return {
          url: "/report",
          method: "GET",
        };
      },
      providesTags: ["setting"],
    }),
    sendReportReply: builder.mutation({
      query: (body) => ({
        url: "/report/reply",
        method: "POST",
        body: body,
      }),
      providesTags: ["setting"],
    }),
  }),
});

export const {
  useGetChatUsersByTokenQuery,
  useGetChatListQuery,
  useSendMessageMutation,
  useGetSupportsQuery,
  useGetReportsQuery,
  useSendReportReplyMutation,
} = supportApi;
