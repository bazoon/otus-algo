#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

#include "./factor-array.h"
#include "./vector-array.h"
#include "./single-array.h"
#include "./matrix-array.h"

void measureRemovesSingle(unsigned long N) {
  time_t start,end;
  double dif;

  SingleArray *sa = createSingleArray(N);

  printf("Removes measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {
    time (&start);
    
    for (unsigned long j = 0;j < i;j++){
      removeSingleArray(sa, j);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void measureInsertsSingle(unsigned long initialSize, unsigned long N) {
  SingleArray *sa = createSingleArray(initialSize);
  time_t start,end;
  double dif;

  printf("Insert measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {

    time (&start);

    for (unsigned long j = 0;j < i;j++){
      sa = addSingleArray(sa, 12);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void measureRemovesVector(unsigned long N) {
  time_t start,end;
  double dif;

  VectorArray *sa = createVectorArray(N);

  printf("Removes measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {
    time (&start);
    
    for (unsigned long j = 0;j < i;j++){
      removeVectorArray(sa, j);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void measureInsertsVector(unsigned long initialSize, unsigned long N) {
  VectorArray *sa = createVectorArray(initialSize);
  time_t start,end;
  double dif;

  printf("Insert measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {

    time (&start);

    for (unsigned long j = 0;j < i;j++){
      sa = addToVectorArray(sa, 12);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}


void measureRemovesFactor(unsigned long N) {
  time_t start,end;
  double dif;

  FactorArray *sa = createFactorArray(N);

  printf("Removes measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {
    time (&start);
    
    for (unsigned long j = 0;j < i;j++){
      removeFactorArray(sa, j);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void measureInsertsFactor(unsigned long initialSize, unsigned long N) {
  FactorArray *sa = createFactorArray(initialSize);
  time_t start,end;
  double dif;

  printf("Insert measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {

    time (&start);

    for (unsigned long j = 0;j < i;j++){
      sa = addToFactorArray(sa, 12);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void measureInsertsMatrix(unsigned long initialSize, unsigned long N) {
  MatrixArray *sa = createMatrixArray(initialSize);
  time_t start,end;
  double dif;

  printf("Insert measure time\n");

  for (unsigned long i = 1000; i <= N;i *= 2) {

    time (&start);

    for (unsigned long j = 0;j < i;j++){
      sa = addToMatrixArray(sa, 12);
    }

    time (&end);
    dif = difftime (end,start);
    printf ("Your calculations for %u took %.2lf seconds to run.\n", i, dif);
  }
}

void main() {
  measureInsertsSingle(10, 200000);
  measureRemovesSingle(200000);

  measureInsertsVector(10, 200000);
  measureRemovesVector(200000);

  measureInsertsFactor(10, 200000);
  measureRemovesFactor(200000);


  measureInsertsMatrix(10, 200000);


}
