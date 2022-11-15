typedef struct SingleArray {
  int *ptr;
  int size;
  int current;
  int error;
} SingleArray;

SingleArray* createSingleArray(int n);
void freeSingleArray(SingleArray *sa);
SingleArray *resizeSingArray(SingleArray *sa);
SingleArray *addSingleArray(SingleArray *sa, int element);
SingleArray *removeSingleArray(SingleArray *sa, int index);

/* void measureRemoves(unsigned long N); */
/* void measureInserts(unsigned long initialSize, unsigned long N); */
