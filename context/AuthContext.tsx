import { createContext } from "react";
import { AuthState } from "../stack/AppFlow";

export const AuthContext = createContext<AuthState>({
  로그인: () => Promise.resolve(),
  로그아웃: () => {},
  회원가입: () => Promise.resolve(),
});
