import type { UserPreferenceRequest } from "../Request";

export interface UserPreferenceResponse extends UserPreferenceRequest {
  id: string;

  updatedAt: string;
}
