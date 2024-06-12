import { useContext } from "react";
import { ThreadContext } from "../context";

export const useThreads = () => {
  return useContext(ThreadContext);
}
