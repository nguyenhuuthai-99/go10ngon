// import httpClient from '../client/httpClient';
// import { UserDTO, UpdateUserRequest } from '../types/dtos';
//
// export const userService = {
//     getProfile: async () => {
//         const response = await httpClient.get<UserDTO>('/users/me');
//         return response.data;
//     },
//
//     updateProfile: async (data: UpdateUserRequest) => {
//         const response = await httpClient.put<UserDTO>('/users/me', data);
//         return response.data;
//     },
//
//     getUserById: async (id: string) => {
//         const response = await httpClient.get<UserDTO>(`/users/${id}`);
//         return response.data;
//     },
// };
