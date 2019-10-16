export function disallowNull(attributes) {
    for (let attributeName in attributes) {
        const { allowNull } = attributes[attributeName];
        if (allowNull === undefined) {
            attributes[attributeName].allowNull = false;
        }
    }

    return attributes;
}
