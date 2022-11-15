typedef struct MatrixArray {
  int size;
  VectorArray **va;
  int vectorsCount;
  int vectorSize;
} MatrixArray;

MatrixArray* createMatrixArray(int vectorSize);
MatrixArray *addToMatrixArray(MatrixArray *sa, int element);
int getFromMatrixArray(MatrixArray *sa, int index);
