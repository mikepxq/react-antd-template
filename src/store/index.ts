import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import consoleLayout from "./console-layout";
export const store = configureStore({
  reducer: {
    user,
    consoleLayout,
  },
});

export default store;
