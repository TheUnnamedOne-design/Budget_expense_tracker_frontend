export const API_ROUTES = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    reset: "/api/auth/reset"
  },
  dashboard: { summary: "/api/dashboard/summary" },
  expenses: { crud: "/api/expenses" },
  budgets: { crud: "/api/budgets" },
  reports: { generate: "/api/reports" },
  profile: { crud: "/api/profile" }
};
