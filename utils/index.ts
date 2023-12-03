export const getSortedData = () => { }
export const getFilteredData = () => { }

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
export const difference = (arr1, arr2) =>
    arr1.filter(item => !arr2.includes(item));