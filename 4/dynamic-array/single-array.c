#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

typedef struct SingleArray {
  int *ptr;
  int size;
  int current;
  int error;
} SingleArray;


SingleArray* createSingleArray(int n) {
  SingleArray *sa = malloc(sizeof(SingleArray));
  sa->ptr = malloc(n * sizeof(int));
  sa->size = n;
  sa->error = 0;
  return sa;
}

void freeSingleArray(SingleArray *sa) {
  free(sa->ptr);
  free(sa);
}

SingleArray *resizeSingArray(SingleArray *sa) {
  SingleArray *newSa = createSingleArray(sa->size + 1);

  /* newSa->ptr[0] = 0xfe11; */

  memcpy(newSa->ptr, sa->ptr, (sa->size)*sizeof(int));
  newSa->size = sa->size + 1;
  freeSingleArray(sa);
  return newSa;
}

SingleArray *addSingleArray(SingleArray *sa, int element) {
  SingleArray *newSa = resizeSingArray(sa);
  newSa->ptr[newSa->size - 1] = element;
  return newSa;
}

SingleArray *removeSingleArray(SingleArray *sa, int index) {
  if (index >= sa->size || index < 0) {
    sa->error = 1;
    return sa;
  }

  int element = sa->ptr[index];
  memcpy(sa->ptr + index, sa->ptr + index + 1, (sa->size - index - 1) * sizeof(int));
  sa->current = element;
  /* sa->size--; */
  return sa;
}



/* void main() { */
  /* measureRemoves(1000000); */
  /* measureInserts(10, 10000000); */
  /* SingleArray *sa = createArray(100); */

  /* for (int i = 0 ; i < 100;i++) { */
  /*   sa->ptr[i] = i; */
  /* } */

 
  /* sa = removeElement(sa, 13); */
  /* printf("\n"); */
  /* for (int i = 0 ; i < sa->size;i++) { */
  /*   printf("%d ", sa->ptr[i]); */
  /* } */

  /* printf("Element: %d\n", sa->current); */

  /* sa = removeElement(sa, 17); */
  /* printf("\n"); */
  /* for (int i = 0 ; i < sa->size;i++) { */
  /*   printf("%d ", sa->ptr[i]); */
  /* } */


  /* printf("Element: %d\n", sa->current); */

  /* sa = removeElement(sa, 19); */
  /* printf("\n"); */
  /* for (int i = 0 ; i < sa->size;i++) { */
  /*   printf("%d ", sa->ptr[i]); */
  /* } */


  /* printf("Element: %d\n", sa->current); */

  /* sa = add(sa, 19); */
  /* sa = add(sa, 29); */
  /* sa = add(sa, 39); */
  /* sa = add(sa, 100); */


  /* printf("element: %d %d\n", sa->current, sa->size); */

  /* unsigned long N = 100000; */

  /* SingleArray *sa = createArray(N); */


  /* time_t start,end; */
  /* double dif; */
  /* time (&start); */

  /* for (unsigned long i = 0; i <= N;i++) { */
  /*   removeElement(sa, i); */
  /* } */

  /* time (&end); */
  /* dif = difftime (end,start); */
  /* printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif); */


  /* unsigned long N = 100000; */
  /* time_t start,end; */
  /* double dif; */


  /* for (unsigned long N = 1000; N <= 1000000;N *= 2) { */

  /*   time (&start); */

  /*   for (unsigned long j = 0;j < N;j++){ */
  /*     sa = add(sa, 12); */
  /*   } */

  /*   time (&end); */
  /*   dif = difftime (end,start); */
  /*   printf ("Your calculations for %u took %.2lf seconds to run.\n", N, dif); */

  /* } */

/* } */





















