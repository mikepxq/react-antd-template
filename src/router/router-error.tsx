import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
interface Props {
  [key: string]: any;
}
type ErrorType = { status: number };
/** 模块 */
const RouterError: React.FC<ViewProps<Props>> = () => {
  const error = useRouteError() as ErrorType;
  const navigate = useNavigate();
  useEffect(() => {
    if (error?.status == 404) navigate('/404', { replace: true });
  }, []);
  //render
  return <></>;
};
export default RouterError;
