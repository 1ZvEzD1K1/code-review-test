import { Colors } from "./Colors";

export interface Item {
  date: ReturnType<() => string>;
  color: ReturnType<() => Colors>;
};
