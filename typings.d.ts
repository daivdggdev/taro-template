declare module '*.css';
declare module '*.png';
declare module '*.less' {
  const content: any;
  export default content;
}

declare const API_PREFIX: string;

declare namespace NodeJS {
  interface Global {
    registered: boolean;
  }
}
