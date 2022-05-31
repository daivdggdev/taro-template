import axios, { AxiosError, AxiosRequestConfig } from 'taro-axios';
import { cloneDeep, isEmpty } from 'lodash';
import { MetadataObj } from './type';
import * as pathToRegexp from 'path-to-regexp';
import Toast from '@/library/Toast';
import { CANCEL_REQUEST_MESSAGE, ERROR_REQUEST_MESSAGE } from './constant';
import qs from 'qs';

/* eslint-disable */
const SYSTEM_ERROR = 9001; // 系统异常
const REQUEST_PARAM_ERROR = 9002; // 请求参数异常
const BUSINESS_ERROR = 9003; // 业务异常
const FOREIGN_KEY_ERROR = 9004; // 删除数据时，外键异常
const DATA_NOT_FIND_ERROR = 9005; // 数据未查询到
const AUTH_ERROR = 9006; // 权限异常
const DATA_EXIST_ERROR = 9007; // 数据未查询到
const NOT_BUSINESS_DOCUMENT_ERROR = 9008; // 数据未查询到
const NOT_LOGIN_ERROR = 9009; // 数据未查询到
/* eslint-enable */

export interface ResponseData<T> {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: T;
}

export interface RequestConfig extends AxiosRequestConfig {
  // 是否接口成功后自动显示Message
  autoMessage?: boolean;
}

/**
 * axios的请求封装，地址判断、错误处理
 *
 * @export
 * @param {object} options 请求选项
 * @returns {Promise} 请求结果
 */
export default function request(options: RequestConfig): Promise<ResponseData<any> | undefined> {
  const { data, url, method = 'get', autoMessage = true } = options;
  if (!url) {
    throw new Error('request url none');
  }

  const cloneData = cloneDeep(data);
  const newUrl = matchRestfulUrl(url, cloneData);

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${newUrl}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : newUrl;

  // session
  options.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  };
  return axios(options)
    .then(response => {
      if (options.responseType === 'blob') {
        return Promise.resolve({
          success: true,
          data: response.data
        });
      }

      const { success, code, msg, value } = response.data;
      if (!success) {
        throw new Error(msg);
      } else {
        return Promise.resolve({
          success: success,
          message: msg,
          statusCode: code,
          data: value ?? {}
        });
      }
    })
    .catch((error: AxiosError) => {
      const { response, message } = error;
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
          message: CANCEL_REQUEST_MESSAGE
        };
      }

      let msg: string;
      let statusCode: number;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message;
      }

      if (!msg || msg.length <= 0) {
        msg = ERROR_REQUEST_MESSAGE;
      }

      if (autoMessage) {
        Toast.show({ title: msg });
      }

      return {
        success: false,
        statusCode,
        message: msg
      };
    });
}

export function setToken(token: string) {
  if (!token) {
    return;
  }

  axios.defaults.headers.Authorization = 'Bearer ' + token;
}

/**
 * 正则匹配restful风格请求并替换对应参数，返回新的url
 * eg: /:id/get, data参数保证必须有id属性
 *
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @returns {string} 新的地址
 */
function matchRestfulUrl(url: string, data: MetadataObj): string {
  let newUrl = url;

  try {
    let domain = '';
    const urlMatch = newUrl.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      newUrl = newUrl.slice(domain.length);
    }

    const match = pathToRegexp.parse(newUrl);
    newUrl = pathToRegexp.compile(newUrl)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in data) {
        delete data[item.name];
      }
    }
    newUrl = domain + newUrl;
  } catch (e) {
    newUrl = url;
  }

  return newUrl;
}
