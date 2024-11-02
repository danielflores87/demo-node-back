import { ApiResponse } from "../helpers/api-response";
import { useApiService } from "../helpers/api-service";
import { IUserAuth, IUserLogin } from "../interfaces/auth.interfaces";

export function useAuthService() {
  const apiURL = import.meta.env.VITE_URL_AUTH_API ?? "";

  const basePath = "/api/auth";
  const { post } = useApiService(apiURL);

  async function login(data: IUserLogin): Promise<ApiResponse<IUserAuth>> {
    return await post(`${basePath}/login`, data);
  }

  return {
    login,
  };
}

export default useAuthService;
