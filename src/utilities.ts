export function formatTime(date: Date): string {
    return [
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ].map((x) => {
        return x.toString().padStart(2, '0');
    }).join(':');
}

export function hours(n: number): number {
    return 1000 * 60 * 60 * n;
}

export function deepCopy(source: any, dest: any = null) {
    let name, value, isArray;
    const toString = Object.prototype.toString;

    if (!dest) {
        isArray = toString.call(source) === '[object Array]';
        if (isArray) {
            dest = [];
            dest.length = source.length;
        } else {
            dest = {};
        }
    }

    for (name in source) {
        if (!isArray || Object.prototype.hasOwnProperty.call(source, name)) {
            value = source[name];

            if (typeof value === 'object') {
                value = deepCopy(value);
            }

            dest[name] = value;
        }
    }

    return dest;
}

export function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?£&@';
    
    let str = '';
    for (let i=0; i<length; i++) {
        str += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return str;
}