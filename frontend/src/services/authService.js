import api from "./api";

const authService = {
    // Login user
    login: async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Register new user
    register: async (name, email, password) => {
        const response = await api.post("/auth/signup", { name, email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    // Get user profile from API
    getProfile: async () => {
        const response = await api.get("/auth/profile");
        return response.data;
    },

    // Update user profile
    updateProfile: async (data) => {
        const response = await api.put("/auth/profile", data);
        return response.data;
    },
};

export default authService;
