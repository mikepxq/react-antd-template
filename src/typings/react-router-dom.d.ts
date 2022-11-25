import { AuthLoaderData } from '@/router/auth';

export * from 'react-router-dom';
export as namespace ReactRouterDom;

declare module 'node_modules/react-router/dist/lib/hooks' {
  /** 重写返回值 */
  export function useMatches(): MatchItemType[];
  /** 重写返回值 */
  export function useLoaderData(): AuthLoaderData;
}
