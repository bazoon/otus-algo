

function searchFullScan(text, mask) {
  let t = 0;
  while (t <= text.length - mask.length) {
    let m = 0;
    while (m < mask.length && text[t + m] === mask[m]) m++;

    if (m == mask.length) return t;

    t++;

  }

  return - 1;
}

function reverseSearchScan(text, mask) {
  let t = 0;
  while (t <= text.length - mask.length) {
    let m = mask.length - 1;
    while (m >= 0 && text[t + m] === mask[m]) m--;

    if (m < 0) return t;

    t++;
  }

  return - 1;

}


function reverseSearchBMH(text, mask) {
  let t = 0;

  const createShift = () => {
    const a = {};

    for (let i = 0; i < 128; i++) {
      a[String.fromCharCode(i)] = mask.length;
    }

    for (let m = 0; m < mask.length - 1; m++) {
      a[mask[m]] = mask.length - m - 1;
    }
    return a;
  }

  const shift = createShift();

  while (t <= text.length - mask.length) {
    let m = mask.length - 1;
    while (m >= 0 && text[t + m] === mask[m]) m--;

    if (m < 0) return t;

    let inc = shift[text[t + mask.length - 1]];
    t += inc;
  }


  return - 1;

}


// const a = searchFullScan("foobaolookromkomcom", "kom");
// const b = reverseSearchScan("foobaolookromkomcom", "kom");
const c = reverseSearchBMH("foobaolookromkomcom", "kom");

console.log(c)
