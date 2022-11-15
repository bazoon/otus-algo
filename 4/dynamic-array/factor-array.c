#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

#define FACTOR 2

typedef struct FactorArray {
  int *ptr;
  int size;
  int index;
} FactorArray;


FactorArray* createFactorArray(int n) {
  FactorArray *fa = malloc(sizeof(FactorArray));
  fa->ptr = malloc(n * sizeof(int));
  fa->size = n;
  fa->index = 0;
  return fa;
}

void freeFactorArray(FactorArray *fa) {
  free(fa->ptr);
  free(fa);
}

FactorArray *resizeFactorArray(FactorArray *fa) {
  FactorArray *newSa = createFactorArray(fa->size * FACTOR);
  memcpy(newSa->ptr, fa->ptr, (fa->size)*sizeof(int));
  newSa->size = fa->size * FACTOR;
  newSa->index = fa->index;
  freeFactorArray(fa);
  return newSa;
}

FactorArray *addToFactorArray(FactorArray *fa, int element) {
  FactorArray *newSa = fa;

  if (fa->index == fa->size - 1) {
    newSa = resizeFactorArray(fa);
  }

  newSa->ptr[newSa->index] = element;
  newSa->index++;
  return newSa;
}


int removeFactorArray(FactorArray *fa, int index) {
  if (index >= fa->size || index < 0) {
    return -1;
  }

  int element = fa->ptr[index];
  memcpy(fa->ptr + index, fa->ptr + index + 1, (fa->size - index - 1) * sizeof(int));
  fa->size--;
  return element;
}


/* void main() { */
/*   FactorArray *fa = createFactorArray(10); */


/*   unsigned long N = 10000000; */


/*   time_t start,end; */
/*   double dif; */


/*   for (unsigned long N = 1000; N <= 10000000;N *= 2) { */

/*     time (&start); */

/*     for (unsigned long j = 0;j < N;j++){ */
/*       fa = addToFactorArray(fa, 12); */
/*     } */

/*     time (&end); */
/*     dif = difftime (end,start); */
/*     printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif); */

/*   } */







/* } */




















