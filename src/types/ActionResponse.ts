export interface ActionError {
  statusCode: number;
  message: string;
}

export type ActionResponse<T> =
  | { error: null; data: T }
  | { error: ActionError; data: null };
