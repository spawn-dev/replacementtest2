export function requiredFieldsEmpty(...args: any[]): boolean {
    if (!args.length) {
        return true;
    }
    let returnValue: boolean = false;
    args.forEach((arg) => {
        if (!arg) {
            console.log(arg, 'is falsy');

            returnValue = true;
        }
    })
    return returnValue;
}