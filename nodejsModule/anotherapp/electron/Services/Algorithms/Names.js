// Names for all algorithms/processors/modules created
const names = [
    { id: "ByHuman", name: "ByHuman" },
    { id: "ByKeyName", name: "ByKeyName" },
    //{ id: "TestingLast", name: "TestingLast" },
    // TODO add more names here
]

function getNames () {

    return names.filter(n => n)
}

module.exports = {
    getNames
}