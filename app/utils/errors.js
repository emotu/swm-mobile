


export function hasErrors ( errors , key ){
    // console.log('key', key, errors);
    let  value = key.split('.').reduce((a, b) => { return (a != undefined) ? a[b] : a ;}, errors);
    if (value){
        return true;
    }
    return false;
}

export function fetchErrors (errors, key){
    let  value = key.split('.').reduce((a, b) => { return (a != undefined) ? a[b] : a ;}, errors);
    return value;
}
