#include <string.h>
#include <stdio.h>

#include "./count.h"

unsigned long getRookMoves(int pos) {
  unsigned long hRow = 255;
  unsigned long vRow = 0x101010101010101;

  int x = pos % 8;
  int y = pos / 8;

  unsigned long k = (unsigned long)1 << pos;
  unsigned long mask = (hRow << (y * 8)) | (vRow << (x));
  

  return mask ^ k;
}

void testRook() {
  int pos; 
  FILE *in_file, *out_file;
  unsigned long mask;
  int moveCount;
  char str[200];

  unsigned long calcMask;
  int calcMoves;


  printf("Testing Rook Moves\n");

  for (int i = 0; i < 10; i++) {
    sprintf(str, "./0.BITS/3.Bitboard - Ладья/test.%d.in", i);
    in_file = fopen(str, "r");
    fscanf(in_file, "%d", &pos);

    sprintf(str, "./0.BITS/3.Bitboard - Ладья/test.%d.out", i);
    out_file = fopen(str, "r");
    fscanf(out_file, "%d", &moveCount);
    fscanf(out_file, "%lu", &mask);

    
    calcMask = getRookMoves(pos);
    calcMoves = countMoves(mask);

    if (mask == calcMask && moveCount == calcMoves) {
      printf("%d ok\n", i);
    } else {
      printf("%d failed\n", i);
    }
  }
}
