import { State as AppState } from '@/models/app';
import { DvaLoading } from './dva';

export interface WholeState {
  app: AppState;
  loading: DvaLoading;
}
