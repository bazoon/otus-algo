import {bubbleSort} from './bubble';
import {getRandomArray} from './util';
import {insertionSort, insertionSortBinarySearch} from './insertion';

// bubbleSort(arr, onIteration);



const elem = document.querySelector(".arr");

const clientWidth = document.body.clientWidth;

function drawArray(arr, selectedIndex1, selectedIndex2) {

  const barWidth = clientWidth / arr.length;

  elem.innerHTML = '';

  arr.forEach((e, i) => {
    const bar = document.createElement('div');
    bar.style.position = "absolute";
    bar.style.left = barWidth * i + 'px';
    bar.style.width = barWidth + 'px';
    bar.style.height = e + 'px';
    bar.style.background = 'blue';
    elem.append(bar);

    if (i === selectedIndex1 || i === selectedIndex2) {
      bar.style.background = 'red';
    }

  });
}

const arr = getRandomArray(100);


bubbleSort(arr, drawArray);
insertionSortBinarySearch(arr, drawArray);


// drawArray(main, );


