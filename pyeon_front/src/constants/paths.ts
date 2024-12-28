export const PATHS = {
  JOBS: {
    LIST: "/",
    DETAIL: (id: number | string) => `/jobs/${id}`,
  },
} as const;
