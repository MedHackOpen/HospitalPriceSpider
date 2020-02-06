// Testing only... used somewhere else
function priceToDouble(value){
    //console.log('calculate out of pocket price')
    //console.log(value)

    let price = typeof (value) === "string" ? value.trim() : value

    if (price.toString().startsWith('$') ){

        price = price.toString().replace('$', '')

    }

    if (price.includes(',')){
        price = price.replace(',', '')
    }

    // All prices must be greater than 5
    price = parseFloat(price) > 5 ? parseFloat(price) : null

    return price
}


module.exports = {
    priceToDouble
}