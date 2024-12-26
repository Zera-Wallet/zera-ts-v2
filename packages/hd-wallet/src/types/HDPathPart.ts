export type HDPathPart<T extends number = number> = {
    value: T;
    hardened: boolean;
};
