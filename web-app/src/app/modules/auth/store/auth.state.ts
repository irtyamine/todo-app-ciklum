import { ErrorResponse } from '../../../shared/models/error-response.model';
import { UserToken } from '../models';

export interface AuthState {
  payload: UserToken;
  loading: boolean;
  error: ErrorResponse;
}

export const authInitialState: AuthState = {
  payload: null,
  loading: false,
  error: null
};
