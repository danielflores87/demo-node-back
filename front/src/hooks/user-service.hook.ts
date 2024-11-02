import { ApiResponse } from "../helpers/api-response";
import { useApiService } from "../helpers/api-service";
import { IUser, IUserFilter, IUserForm } from "../interfaces/user.interfaces";

export function useUserService() {
  const apiURL = import.meta.env.VITE_URL_AUTH_API ?? "";
  const userUrl = "/api/users";
  const { post, get, remove } = useApiService(apiURL);

  async function createUser(data: IUserForm): Promise<ApiResponse<IUserForm>> {
    const endpoint = "/create-user";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function deleteUser(id: number): Promise<ApiResponse<boolean>> {
    const endpoint = "/delete-user";
    return remove(`${userUrl}${endpoint}/${id}`);
  }

  async function getAllUsers(): Promise<ApiResponse<IUser[]>> {
    const endpoint = "/get-all-users";
    return get(`${userUrl}${endpoint}`);
  }

  async function getPaginatedUsers(
    filters: IUserFilter
  ): Promise<ApiResponse<IUser[]>> {
    const endpoint = "/get-users-paginated";
    return post(`${userUrl}${endpoint}`, filters);
  }

  return {
    createUser,
    getAllUsers,
    getPaginatedUsers,
    deleteUser,
  };
}
