import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const __DEV__ = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "esm",
      file: "esm/index.js",
    },
  ],
  plugins: [ts(), nodeResolve(), __DEV__ ? null : terser()],
};
