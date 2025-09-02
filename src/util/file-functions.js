/**
 * Returns the extension of a file.
 * @function getFileExtension
 * @param {String} name A string representing a file name.
 * @returns {String} The file's extension, if it has one, including the dot. e.g. getFileExtension('test.txt') will return '.txt'
 */
function getFileExtension(name) {
    const start = name.lastIndexOf('.')
    if (start === -1) {
        return ''
    }
    return name.slice(start, name.length)
}

export {getFileExtension}