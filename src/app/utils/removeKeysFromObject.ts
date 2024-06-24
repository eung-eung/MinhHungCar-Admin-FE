export const removeKeys = (obj: any, keysToRemove: Array<string>) => {
    const newObj = { ...obj }
    for (const key of keysToRemove) {
        delete newObj[key];
    }
    return newObj;
}