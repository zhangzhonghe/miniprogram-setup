declare namespace _default {
    const input: string;
    const output: {
        format: string;
        file: string;
    }[];
    const plugins: (import("rollup").Plugin | null)[];
}
export default _default;
