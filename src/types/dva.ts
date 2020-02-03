import { Action, AnyAction } from 'redux';

export { connect } from '@tarojs/redux';

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): any;
}

export interface DispatchProp<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export interface ReduxAction {
  type: string;
  [propName: string]: any;
}

export interface ReduxSagaEffects {
  put: <A extends AnyAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}

export interface DvaModelReducer<T> {
  (preState: T, action: ReduxAction): T;
}

export interface DvaModelReducers<T> {
  [reducerName: string]: DvaModelReducer<T>;
}

export interface DvaModelEffectFn {
  (action: ReduxAction, sagaEffects: ReduxSagaEffects): any;
}

export interface ReduxSagaTaker {
  type: string;
  [propsName: string]: any;
}
// problem
export interface DvaModelEffectWithTaker extends Array<ReduxSagaTaker | DvaModelEffectFn> {
  [index: number]: ReduxSagaTaker | DvaModelEffectFn;
}

export type DvaModelEffect = DvaModelEffectFn | DvaModelEffectWithTaker;

export interface DvaModelEffects {
  [effectName: string]: DvaModelEffect;
}

export interface DvaModel<T = any> {
  namespace: string;
  state?: T;
  reducers?: DvaModelReducers<T>;
  effects?: DvaModelEffects;
  subscriptions?: object;
}

export interface DvaLoading {
  global: boolean;
  models: any;
  effects: any;
}

export type Effect = (action: AnyAction, effects: ReduxSagaEffects) => void;
