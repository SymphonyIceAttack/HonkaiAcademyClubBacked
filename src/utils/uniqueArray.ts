export default function unique<T extends any>(arr: T[]) {
    return [...new Set(arr)];
}
