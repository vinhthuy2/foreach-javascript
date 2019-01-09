var f = () => {
    // randomly generated N = 40 length array 0 <= A[N] <= 39
    var array = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    console.log('Original array', JSON.stringify(array));

    array.forEach((element, index, arr) => {
        if (element % 2 === 0) {
            arr.splice(index, 1);
            console.log(`array: ${JSON.stringify(array)}`)
            console.log(`arr: ${JSON.stringify(arr)}`)
        }
    });
};

f();