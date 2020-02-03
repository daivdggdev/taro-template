export interface Dictionary<T> {
  [index: string]: T;
}

export type MetadataObj = { [key: string]: any };

export type valueof<T> = T[keyof T];

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Lit = string | number | boolean | undefined | null | void | {};
export const tuple = <T extends Lit[]>(...args: T) => args;
