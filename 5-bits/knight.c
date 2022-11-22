#include <string.h>
#include <stdio.h>
#include "./count.h"

unsigned long getKnightMoves(int pos) {
  unsigned long nA  = 0xFeFeFeFeFeFeFeFe;
  unsigned long nAB = 0xFcFcFcFcFcFcFcFc;
  unsigned long  nH = 0x7f7f7f7f7f7f7f7f;
  unsigned long nGH = 0x3f3f3f3f3f3f3f3f;

  unsigned long k = (unsigned long)1 << pos;
  unsigned long mask;

  mask = nGH & (k <<  6 | k >> 10)
             |  nH & (k << 15 | k >> 17)
             | nA  & (k << 17 | k >> 15)
             | nAB & (k << 10 | k >>  6);

  return mask;
}

void testKnight() {
  int pos; 
  FILE *in_file, *out_file;
  unsigned long mask;
  int moveCount;
  char str[200];

  unsigned long calcMask;
  int calcMoves;

  printf("Testing Knight moves\n");

  for (int i = 0; i < 10; i++) {
    sprintf(str, "./0.BITS/2.Bitboard - Конь/test.%d.in", i);
    in_file = fopen(str, "r");
    fscanf(in_file, "%d", &pos);

    sprintf(str, "./0.BITS/2.Bitboard - Конь/test.%d.out", i);
    out_file = fopen(str, "r");
    fscanf(out_file, "%d", &moveCount);
    fscanf(out_file, "%lu", &mask);

    
    calcMask = getKnightMoves(pos);
    calcMoves = countMoves(mask);

    if (mask == calcMask && moveCount == calcMoves) {
      printf("%d ok\n", i);
    } else {
      printf("%d failed\n", i);
    }
  }
}

