export function disallowNull(attributes) {
    for (let attributeName in attributes) {
        const { allowNull } = attributes[attributeName];
        if (allowNull) {
            continue;
        }

        attributes[attributeName].allowNull = false;
    }

    return attributes;
}
