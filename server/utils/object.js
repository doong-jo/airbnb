export function clone(obj) {
    if (obj === null || typeof obj !== "object") return obj;

    var copy = obj.constructor();

    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr]);
        }
    }

    return copy;
}

export function setDefaultValue(obj, defaultObj) {
    for (const key in defaultObj) {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = defaultObj[key];
        }
    }
}
