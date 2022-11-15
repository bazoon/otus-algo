#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include "./vector-array.h"

#define VECTOR_SIZE 5


typedef struct MatrixArray {
  int size;
  VectorArray **va;
  int vectorsCount;
  int vectorSize;
} MatrixArray;


MatrixArray* createMatrixArray(int vectorSize) {
  MatrixArray *sa = malloc(sizeof(MatrixArray));
  sa->size = 0;
  sa->va = malloc(sizeof(VectorArray *));
  sa->va[0] = createVectorArray(vectorSize);
  sa->vectorsCount = 1;
  sa->vectorSize = vectorSize;
  return sa;
}

MatrixArray *addToMatrixArray(MatrixArray *sa, int element) {
  int vaIndex = sa->size / sa->vectorSize;

  if (sa->size == sa->vectorSize * sa->vectorsCount) {
    VectorArray **va = malloc(sizeof(VectorArray *) * sa->vectorsCount + 1);
    
    for(int i = 0 ; i <= sa->vectorsCount;i++) {
      va[i]= sa->va[i]; 
    }

    va[vaIndex] = createVectorArray(sa->vectorSize);
    sa->vectorsCount++;

    sa->va = va;

  }
  
  
  VectorArray *va = sa->va[vaIndex];

  sa->va[vaIndex] = addToVectorArray(sa->va[vaIndex], element);

  va = sa->va[vaIndex];

  sa->size++;
  return sa;
}

int getFromMatrixArray(MatrixArray *sa, int index) {
  int vaIndex = index / sa->vectorSize;
  VectorArray *va = sa->va[vaIndex];
  int vectorIndex = index % sa->vectorSize;
  return va->ptr[vectorIndex];
}


/* void freeArray(MatrixArray *sa) { */
/*   free(sa->ptr); */
/*   free(sa); */
/* } */

/* MatrixArray *resizeArray(MatrixArray *sa) { */
/*   MatrixArray *newSa = createArray(sa->size + VECTOR_SIZE); */
/*   memcpy(newSa->ptr, sa->ptr, (sa->size)*sizeof(int)); */
/*   newSa->size = sa->size + VECTOR_SIZE; */
/*   newSa->index = sa->index; */
/*   freeArray(sa); */
/*   return newSa; */
/* } */




/* void main() { */
/*   unsigned long n = 100; */

/*   MatrixArray *sa = createMatrixArray(10); */

/*   /1* sa = addToMatrixArray(sa, 0x1234); *1/ */
/*   /1* sa = addToMatrixArray(sa, 0x3456); *1/ */
/*   /1* sa = addToMatrixArray(sa, 0x9191); *1/ */



/*   for(int i = 0; i < n; i++) { */
/*     sa = addToMatrixArray(sa, i); */
/*   } */


/*   for(int i = 0; i < n; i++) { */
/*     printf ("%x ", getFromMatrixArray(sa, i)); */
/*   } */

/*   /1* for (int i = 0; i < 5;i++) { *1/ */
/*   /1*   printf("%d ", getFromMatrixArray(sa, i)); *1/ */
/*   /1* } *1/ */

/*   /1* unsigned long N = 100000; *1/ */


/*   /1* time_t start,end; *1/ */
/*   /1* double dif; *1/ */


/*   /1* for (unsigned long N = 1000; N <= 1000000;N *= 2) { *1/ */

/*   /1*   time (&start); *1/ */

/*   /1*   for (unsigned long j = 0;j < N;j++){ *1/ */
/*   /1*     sa = add(sa, 12); *1/ */
/*   /1*   } *1/ */

/*   /1*   time (&end); *1/ */
/*   /1*   dif = difftime (end,start); *1/ */
/*   /1*   printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif); *1/ */

/*   /1* } *1/ */




/* } */


