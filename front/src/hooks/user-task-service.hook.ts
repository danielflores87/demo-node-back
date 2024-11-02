import { ApiResponse } from "../helpers/api-response";
import { useApiService } from "../helpers/api-service";
import {
  IUserTask,
  IUserTaskFilter,
  IUserTaskForm,
} from "../interfaces/task.interfaces";

export function useUserTaskService() {
  const apiURL = import.meta.env.VITE_URL_TASK_API ?? "";
  const userUrl = "/api/user-task";
  const { post, remove, put, get } = useApiService(apiURL);

  async function createUserTask(
    data: IUserTaskForm
  ): Promise<ApiResponse<IUserTask>> {
    const endpoint = "/create-user-task";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function updateUserTask(
    data: IUserTaskForm,
    id: number
  ): Promise<ApiResponse<IUserTask>> {
    const endpoint = `/update-user-task/${id}`;
    return put(`${userUrl}${endpoint}`, data);
  }

  async function getUserTaskById(id: number): Promise<ApiResponse<IUserTask>> {
    const endpoint = `/get-user-task-by-id/${id}`;
    return get(`${userUrl}${endpoint}`);
  }

  async function deleteUserTask(id: number): Promise<ApiResponse<boolean>> {
    const endpoint = "/delete-user-task";
    return remove(`${userUrl}${endpoint}/${id}`);
  }

  async function getPaginatedUserTasks(
    filters: IUserTaskFilter
  ): Promise<ApiResponse<IUserTask[]>> {
    const endpoint = "/get-user-tasks-paginated";
    return post(`${userUrl}${endpoint}`, filters);
  }

  return {
    createUserTask,
    updateUserTask,
    deleteUserTask,
    getPaginatedUserTasks,
    getUserTaskById,
  };
}
