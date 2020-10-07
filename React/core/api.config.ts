export const apiConfig = {
    returnRejectedPromiseOnError: true,
    //withCredentials: true,
    timeout: 30000,
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {},
};
