#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

#define VECTOR_SIZE 5

typedef struct VectorArray {
  int *ptr;
  int size;
  int index;
  int error;
} VectorArray;


VectorArray* createVectorArray(int n) {
  VectorArray *va = malloc(sizeof(VectorArray));
  va->ptr = malloc(n * sizeof(int));
  va->size = n;
  va->index = 0;
  return va;
}

void freeVectorArray(VectorArray *va) {
  free(va->ptr);
  free(va);
}

VectorArray *resizeVectorArray(VectorArray *va) {
  VectorArray *newSa = createVectorArray(va->size + VECTOR_SIZE);
  memcpy(newSa->ptr, va->ptr, (va->size)*sizeof(int));
  newSa->size = va->size + VECTOR_SIZE;
  newSa->index = va->index;
  freeVectorArray(va);
  return newSa;
}

VectorArray *addToVectorArray(VectorArray *va, int element) {
  VectorArray *newSa = va;

  if (va->index == va->size - 1) {
    newSa = resizeVectorArray(va);
  }

  newSa->ptr[newSa->index] = element;
  newSa->index++;
  return newSa;
}

int removeVectorArray(VectorArray *va, int index) {
  if (index >= va->size || index < 0) {
    return -1;
  }

  int element = va->ptr[index];
  memcpy(va->ptr + index, va->ptr + index + 1, (va->size - index - 1) * sizeof(int));
  va->size--;
  return element;
}



/* void main() { */
/*   VectorArray *va = createVectorArray(10); */

/*   va = addToVectorArray(va, 1); */
/*   va = addToVectorArray(va, 2); */
/*   va = addToVectorArray(va, 3); */
/*   va = addToVectorArray(va, 4); */
/*   va = addToVectorArray(va, 5); */

/*   removeVectorArray(va, 3); */
/*   removeVectorArray(va, 3); */

/*   for(int i = 0 ; i < va->size;i++) { */
/*     printf ("%d\n", va->ptr[i]); */
/*   } */


  /* unsigned long N = 100000; */


  /* time_t start,end; */
  /* double dif; */


  /* for (unsigned long N = 1000; N <= 1000000;N *= 2) { */

  /*   time (&start); */

  /*   for (unsigned long j = 0;j < N;j++){ */
  /*     va = add(va, 12); */
  /*   } */

  /*   time (&end); */
  /*   dif = difftime (end,start); */
  /*   printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif); */

  /* } */

/* } */




















