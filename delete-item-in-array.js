// This is from my comment here: http://wolfram.kriesing.de/blog/index.php/2008/javascript-remove-element-from-array/comment-page-2#comment-466561

/*
 * How to delete items from an Array in JavaScript, an exhaustive guide
 */

// DON'T use the delete operator, it leaves a hole in the array:
var arr = [4, 5, 6];
delete arr[1]; // arr now: [4, undefined, 6]

// DO use splice:
var arr = [4, 5, 6];
arr.splice(1, 1);

// If you want to find the item to delete you can use .indexOf()
var arr = [4, 5, 6];
var idx = arr.indexOf(5); // 1
// be careful, .indexOf() will return -1 if the item is not found
if (idx !== -1) {
    arr.splice(idx, 1);
}

// Not all browsers support .indexOf(), so here's a monkey-patch:
if (!Array.prototype.indexOf) {
    // augment the Array prototype with an indexOf that conforms
    // to ECMAScript5
    //   item - this is the object we're looking for
    //   start - this is where to start looking
    // returns the index of the item if found, otherwise -1
    Array.prototype.indexOf = function (item, start) {
        start = start || 0;
        for (; start < this.length; start++) {
            if (this[start] === item) {
                return start;
            }
        }
        return -1;
    };
}



// If you want to splice in an iterator like Array's forEach()
// DON'T do this:
var arr = [5, 6, 7, 8, 9];
arr.forEach(function (item, index) {
    if (item === 7 || item === 8) {
        arr.splice(index, 1);
    }
});
// arr is now something like: [5, 6, 8, 9] --> the following element was ignored because of index change


// ALSO DON'T use the third argument to the iterator function thinking it's a clone:
var arr = [5, 6, 7, 8, 9];
arr.forEach(function (item, index, arr) {
    if (item === 7 || item === 8) {
        arr.splice(index, 1);
    }
});
// arr is now something like: [5, 6, 8, 9] --> the following element was ignored because of index change

// DO use a reverse for-loop:
var arr = [5, 6, 7, 8, 9];
var i;
for (i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i] === 7 || arr[i] === 8) {
        arr.splice(i, 1);
    }
}
// arr is now: [5, 6, 9]

// / *
//   * Another way is to augment the Array prototype to have a reject
//   * function that is the opposite of the filter function (and add
//   * the filter function if it doesn't exist)
//   */
if (!Array.prototype.filter) {
    // augment the Array prototype with a filter() that conforms
    // to ECMAScript5
    //   iterator - this function is called for each item, if it return
    //       a truthy value, that item is added to the returned array
    //   context - this is optional context to call the iterator. 'this'
    //       inside the iterator will be set to context.
    // returns an array with only items for which the iterator returned
    //     a truthy value
    Array.prototype.filter = function (iterator, context) {
        var arr = [];
        var i;
        for (i = 0; i < this.length; i += 1) {
            if (iterator.call(context, this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };
}
if (!Array.prototype.reject) {
    // augment the Array prototype with a reject() that is the opposite
    // of filter().
    //   iterator - this function is called for each item, if it return
    //       a truthy value, that item is not added to the returned array
    //   context - this is optional context to call the iterator. 'this'
    //       inside the iterator will be set to context.
    // returns an array with only items for which the iterator did not
    //     return a truthy value
    Array.prototype.reject = function (iterator, context) {
        return this.filter(function (item) {
            return !iterator.call(context, item);
        });
    };
}

var arr = [5, 6, 7, 8, 9];
arr = arr.reject(function (item) {
    return item === 7 || item === 8;
});
