import { ChangeCase, defineConfig, Interface } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'http://192.168.70.10:40001',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    dataKey: 'data',
    projects: [
      {
        token: '2cf4ec35dc8430d8115c391bc488240336843616171b634be17310f626e53d4a',
        typesOnly: true,
        getRequestFunctionName(interfaceInfo: Interface, changeCase: ChangeCase) {
          // replace是为了去除restful风格接口携带的参数
          return changeCase.camelCase(
            interfaceInfo.path
              .replace(/\{.*\}\//, '')
              .split('/')
              .join(),
          );
        },
        categories: [
          {
            id: 20,
            outputFilePath: 'src/api-types/village.ts',
          },
        ],
      },
    ],
  },
]);
