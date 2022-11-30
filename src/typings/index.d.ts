/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../views/index.d.ts"/>
/// <reference path="../apis/index.d.ts"/>
/// <reference path="../store/index.d.ts"/>

/** 触发快速引入 */
declare module '@ant-design/icons' {
  export * from 'node_modules/@ant-design/icons/lib/index.d';
}
declare module 'vite' {
  export declare function loadEnv(mode: string, envDir: string, prefixes?: string | string[]): ImportMetaEnv;
}

//export 识别为模块文件
export declare global {
  namespace CodeMirror {
    /**
     * 重写
     */
    export interface Editor {
      verify: () => boolean;
    }
  }
  /**
   * 重写 ts自动扩展
   */
  declare interface ImportMetaEnv {
    VITE_BASE: string;
    // BASE_URL: string;
    // MODE: string;
    // DEV: boolean;
    // PROD: boolean;
    // SSR: boolean;
  }
}
