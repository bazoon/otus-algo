typedef struct VectorArray {
  int *ptr;
  int size;
  int index;
} VectorArray;


VectorArray* createVectorArray(int n);
void freeVectorArray(VectorArray *sa);
VectorArray *resizeVectorArray(VectorArray *sa);
VectorArray *removeVectorArray(VectorArray *sa, int element);
VectorArray *addToVectorArray(VectorArray *va, int element);

