
global.curval = 'yummy'

const VarHolder = async (newval) => {
    console.log(newval)
    if (newval) {
        global.curval = newval
        console.log('test1')
    } else {
        console.log('test2')
    }
    console.log(global.curval)
    try {
        return global.curval
    } catch (e) {
        console.log(e, 'nooooo')
    }
}

module.exports = { VarHolder }