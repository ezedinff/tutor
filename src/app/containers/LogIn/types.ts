/* --- STATE --- */
export interface LogInState {
  loggingIn: boolean;
}

export interface LoginActionPayload {
  phoneNumber: string;
  password: string;
}

export type ContainerState = LogInState;
