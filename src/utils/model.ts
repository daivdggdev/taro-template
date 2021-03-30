import modelExtend from 'dva-model-extend';
import { DvaModel, ReduxAction } from '@/types/dva';
import { cloneDeep } from 'lodash';

interface CommonState {
  [props: string]: any;
}

const commonModel = {
  reducers: {
    updateState(state: CommonState, { payload }: ReduxAction) {
      return {
        ...state,
        ...payload,
      };
    },

    updateScrollLoadData(state: CommonState, { payload }: ReduxAction) {
      const obj = {};
      for (const item in payload) {
        obj[item] = cloneDeep(state[item]);
        if (payload[item].pageable.pageNumber === 0) {
          obj[item].content = payload[item].content;
        } else {
          obj[item].content = obj[item].content.concat(payload[item].content);
        }
        obj[item].page = payload[item].pageable.pageNumber;
        obj[item].totalElements = payload[item].totalElements;
      }
      return {
        ...state,
        ...obj,
      };
    },
  },
};

const commonExtend = <T>(model: DvaModel<T>) => modelExtend(commonModel, model);

export { commonModel, commonExtend };
