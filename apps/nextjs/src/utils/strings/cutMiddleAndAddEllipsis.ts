export function cutMiddleAndAddEllipsis(str: string, startLength: number, endLength: number): string {
    if (str.length <= startLength + endLength) return str;
    return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
}
