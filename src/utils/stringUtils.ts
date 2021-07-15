export function resolveToken(source: string, replacement: any):string {
    const sourceItems: Array<string> = source.trim().split(' ');
    const isToken = (target: string) => (target.slice(0, 2) === '${' && target.slice(target.length - 1) === '}');
    const stripToken = (target: string) => (target.replace('${', '').replace('}', ''));
    let result = '';

    sourceItems.forEach((item: string) => {
        let tempItem = item;
        if (isToken(tempItem)) {
            tempItem = replacement[stripToken(tempItem)];
        }
        result += (tempItem) ? `${tempItem} ` : '';
    });

    return result.trimEnd();
}
