typedef struct FactorArray {
  int *ptr;
  int size;
  int index;
} FactorArray;

FactorArray *addToFactorArray(FactorArray *fa, int element);
FactorArray *resizeFactorArray(FactorArray *fa);
FactorArray* createFactorArray(int n);
int removeFactorArray(FactorArray *fa, int index);
void freeFactorArray(FactorArray *fa);
