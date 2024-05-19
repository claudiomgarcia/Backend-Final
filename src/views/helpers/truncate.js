const truncate = (str, len) => {
    if (str.length > len) {
        return str.slice(0, len) + '...'
    }
    return str
}

export default truncate