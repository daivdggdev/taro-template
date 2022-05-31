import { commonExtend } from '@/utils/model';
import { DvaModel } from '@/types/dva';
import api from '@/services';

const { login } = api;

export interface State {
  login: boolean;
}

const model: DvaModel<State> = {
  namespace: 'app',
  state: {
    login: false
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      console.log('res.data: ', res.data);
      if (!res.data) {
        return;
      }

      yield put({
        type: 'updateState',
        payload: { login: true }
      });
    }
  }
};

export default commonExtend(model);
