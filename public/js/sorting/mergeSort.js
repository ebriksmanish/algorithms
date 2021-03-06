var mergeSort = (function() {
    function merge(array, start, middle, end) {
        var array1 = array.slice(start, middle),
            array2 = array.slice(middle, end),
            j = 0,
            k = 0;

        for (var i = start; i < end; i++)
            if (j < array1.length
                && (k === array2.length || array1[j] <= array2[k]))
                array[i] = array1[j++];
        else
            array[i] = array2[k++];
    }

    return function(array, start, end) {
        if (typeof start === "undefined")
            start = 0;
        if (typeof end === "undefined")
            end = array.length;

        if (start < end - 1) {
            var middle = Math.floor((start + end + 1) / 2);
            mergeSort(array, start, middle);
            mergeSort(array, middle, end);
            merge(array, start, middle, end);
            update(array);
        }
    };
})();
