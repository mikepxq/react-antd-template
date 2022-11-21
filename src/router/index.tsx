import { RouteList } from './config';
import { createProvider } from './hooks';

export const BrowserRouterProvider = createProvider(RouteList);
