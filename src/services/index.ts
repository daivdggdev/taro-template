// @ts-nocheck
import request, { RequestConfig } from '@/utils/request';
import Config from '@/utils/config';
import api from './api';

const { apiPrefix } = Config;

const gen = (params: string) => {
  let url = params;
  let method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0];
    url = paramsArray[1];
  }

  return function(data: object, config: RequestConfig = {}): Promise<any> {
    return request({
      baseURL: apiPrefix,
      url,
      data,
      method,
      ...config,
    });
  };
};

type APIKeys = keyof typeof api;
type APIObject = { [key in APIKeys]: () => any };

const APIFunction = {} as APIObject;
for (const key of Object.keys(api)) {
  APIFunction[key] = gen(api[key]);
}

export default APIFunction;
