#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

#define VECTOR_SIZE 5

typedef struct VectorArray {
  int *ptr;
  int size;
  int index;
} VectorArray;


VectorArray* createArray(int n) {
  VectorArray *sa = malloc(sizeof(VectorArray));
  sa->ptr = malloc(n * sizeof(int));
  sa->size = n;
  sa->index = 0;
  return sa;
}

void freeArray(VectorArray *sa) {
  free(sa->ptr);
  free(sa);
}

VectorArray *resizeArray(VectorArray *sa) {
  VectorArray *newSa = createArray(sa->size + VECTOR_SIZE);
  memcpy(newSa->ptr, sa->ptr, (sa->size)*sizeof(int));
  newSa->size = sa->size + VECTOR_SIZE;
  newSa->index = sa->index;
  freeArray(sa);
  return newSa;
}

VectorArray *add(VectorArray *sa, int element) {
  VectorArray *newSa = sa;

  if (sa->index == sa->size - 1) {
    newSa = resizeArray(sa);
  }

  newSa->ptr[newSa->index] = element;
  newSa->index++;
  return newSa;
}


void main() {
  VectorArray *sa = createArray(10);


  unsigned long N = 100000;


  time_t start,end;
  double dif;


  for (unsigned long N = 1000; N <= 1000000;N *= 2) {

    time (&start);

    for (unsigned long j = 0;j < N;j++){
      sa = add(sa, 12);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif);

  }







}




















