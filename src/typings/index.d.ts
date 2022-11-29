/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../views/index.d.ts"/>
/// <reference path="../apis/index.d.ts"/>
/// <reference path="../store/index.d.ts"/>

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
