import React from 'react';
import RouterView from './router/router-view';
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const App: React.FC<ViewProps<Props>> = () => {
  return <RouterView></RouterView>;
};
export default App;
