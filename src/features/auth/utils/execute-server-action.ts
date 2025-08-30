import { ServerActionErrorResponse } from '../api/types/server-action-error-response';

const isError = <T>(
  response: T | ServerActionErrorResponse,
): response is ServerActionErrorResponse => {
  return (response as ServerActionErrorResponse)?.error !== undefined;
};

export const executeServerAction = async <T>(
  serverAction: () => Promise<T | ServerActionErrorResponse>,
): Promise<T> => {
  const response = await serverAction();

  if (isError(response)) {
    throw new Error(response.error);
  } else {
    return response as T;
  }
};
