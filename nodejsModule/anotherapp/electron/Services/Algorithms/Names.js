// Names for all algorithms created
const names = [
    { id: "ByHuman", name: "ByHuman" },
    { id: "ByKeyName", name: "ByKeyName" },
    // TODO add more names here
]

function getNames () {

    return names.filter(n => n)
}

module.exports = {
    getNames
}