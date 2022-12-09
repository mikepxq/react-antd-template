export * from './pattern';
/** mock api 睡眠时间 */
export const MockApiSleepTime = 2;
export const TokenName = 'app-token';
/** 文章状态类型  */
export const ArticleStatusMap: Record<TypeStatusKey, TypeStatusValue> = {
  draft: { text: '草稿' },
  publish: { text: '发布', color: 'cyan' },
};

export type TypeStatusKey = 'draft' | 'publish';
export type TypeStatusValue = { text: string; color?: 'cyan' };
// mock 插件不能直接使用 需要配合[?]符号使用
export const basename = import.meta.env?.BASE_URL || '/';
export const isGitHub = import.meta.env?.VITE_MODE == 'github';
