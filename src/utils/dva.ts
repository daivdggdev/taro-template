/* tslint disabled */
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import createDvaImmer from 'dva-immer';
import { DvaModel } from '@/types/dva';

export default function(options: any) {
  const app = create(options);

  // Plugins
  app.use(createDvaImmer());
  app.use({
    ...createLoading({
      effects: true,
    }),
  });

  // HMR workaround
  if (!global.registered) {
    options.models.forEach((model: DvaModel) => app.model(model));
  }
  global.registered = true;
  app.start();

  const store = app._store;
  app.getStore = () => store;

  return app;
}
