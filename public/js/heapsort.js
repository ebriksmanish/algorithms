function exchange(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function maxHeapify(array, root) {
    var left = (root == 0) ? 1 : 2 * root,
        right = left + 1,
        largest = (left < array.heapSize && array[left] > array[root])
                  ? left : root;

    if (right < array.heapSize && array[right] > array[largest])
        largest = right;

    if (largest != root) {
        exchange(array, root, largest);
        maxHeapify(array, largest);
    }
}

function buildMaxHeap(array) {
    array.heapSize = array.length;
    for (var i = array.length / 2; i >= 0; i--) {
        maxHeapify(array, i);
        update(array);
    }
}

function sort(array) {
    buildMaxHeap(array);
    for (var i = array.length - 1; i >= 1; i--) {
        exchange(array, 0, i);
        array.heapSize--;
        maxHeapify(array, 0);
        update(array);
    }
}