#include "./count.h"
#include <string.h>
#include <stdio.h>
#include "./bishop.h"
#include "./rook.h"


unsigned long getQueenMoves(int pos) {
  return  getBishopMoves(pos) | getRookMoves(pos);
}


void testQueen() {
  int pos; 
  FILE *in_file, *out_file;
  unsigned long mask;
  int moveCount;
  char str[200];

  unsigned long calcMask;
  int calcMoves;


  printf("Testing Queen Moves\n");

  for (int i = 0; i < 10; i++) {
    sprintf(str, "./0.BITS/5.Bitboard - Ферзь/test.%d.in", i);
    in_file = fopen(str, "r");
    fscanf(in_file, "%d", &pos);

    sprintf(str, "./0.BITS/5.Bitboard - Ферзь/test.%d.out", i);
    out_file = fopen(str, "r");
    fscanf(out_file, "%d", &moveCount);
    fscanf(out_file, "%lu", &mask);
    
    calcMask = getQueenMoves(pos);
    calcMoves = countMoves(mask);

    if (mask == calcMask && moveCount == calcMoves) {
      printf("%d ok\n", i);
    } else {
      printf("%d failed\n", i);
    }
  }
}
