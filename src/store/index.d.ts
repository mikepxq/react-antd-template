interface Action<D = any> {
  payload: D;
  type: string;
}
