#include <string.h>
#include <stdio.h>
#include "./count.h"

unsigned long getKingMoves(int pos) {
  unsigned long k = (unsigned long)1 << pos;
  unsigned long noH = 0x7f7f7f7f7f7f7f7f;
  unsigned long noA = 0xfefefefefefefefe;
  unsigned long kA = k & noA;
  unsigned long kH = k & noH;

  unsigned long mask = 
    kA << 7 | k << 8 | kH << 9 |
    kA >> 1 |          kH << 1 |
    kA >> 9 | k >> 8 | kH >> 7;

  return mask;
}


void testKing() {
  int pos; 
  FILE *in_file, *out_file;
  unsigned long mask;
  int moveCount;
  char str[200];

  unsigned long calcMask;
  int calcMoves;

  printf("Testing KingMoves\n");

  for (int i = 0; i < 10; i++) {
    sprintf(str, "./0.BITS/1.Bitboard - Король/test.%d.in", i);
    in_file = fopen(str, "r");
    fscanf(in_file, "%d", &pos);

    sprintf(str, "./0.BITS/1.Bitboard - Король/test.%d.out", i);
    out_file = fopen(str, "r");
    fscanf(out_file, "%d", &moveCount);
    fscanf(out_file, "%lu", &mask);

    
    calcMask = getKingMoves(pos);
    calcMoves = countMoves(mask);

    if (mask == calcMask && moveCount == calcMoves) {
      printf("%d ok\n", i);
    } else {
      printf("%d failed\n", i);
    }
  }
}

