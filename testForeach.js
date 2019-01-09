var fowardLoop = () => {
    var array = [5, 6, 7, 8, 9];
    console.log('Original array', JSON.stringify(array));
    array.forEach((element, index, arr) => {
        if (element === 7 || element === 8) {
            arr.splice(index, 1);
            console.log(`index: ${index}; old value ${element}`);
            console.log(`index: ${index}; new Value ${array[index]}`);
            console.log(`array: ${JSON.stringify(array)}`)
            console.log(`arr: ${JSON.stringify(arr)}`)
        }
    });
};

var reverseLoop = () => {
    var array = [5, 6, 7, 8, 9];
    console.log('Original array', JSON.stringify(array));
    for (i = array.length - 1; i >= 0; i--) {
        if (array[i] === 7 || array[i] === 8) {
            array.splice(i, 1);
    
            console.log(`index: ${i}; Value ${array[i]}`);
            console.log(`array: ${JSON.stringify(array)}`);
        }
    }
}

reverseLoop();