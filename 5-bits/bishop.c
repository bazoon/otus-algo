#include <string.h>
#include <stdio.h>
#include "./count.h"

unsigned long getBishopMoves(int pos) {
  unsigned long diagonals1[15] = {
    1, 0x102, 0x10204, 0x1020408, 0x102040810, 0x10204081020, 0x1020408102040, 0x102040810204080,
    0x204081020408000, 0x408102040800000, 0x810204080000000, 0x1020408000000000, 0x2040800000000000,
    0x4080000000000000, 0x8000000000000000
  };

  unsigned long diagonals2[15] = {
    0x8040201008040201, 0x4020100804020100, 0x2010080402010000, 0x1008040201000000, 804020100000000, 0x402010000000000, 0x201000000000000, 0x100000000000000, 0x80402010080402,
    0x804020100804, 0x8040201008, 0x80402010, 0x804020, 0x8040, 0x80
  };

  unsigned long k = (unsigned long)1 << pos;

  unsigned long d1, d2;

  for (int i = 0;i < 15;i++) {
   if ( k & diagonals1[i]) {
      d1 = diagonals1[i];
   }

   if (k & diagonals2[i]) {
      d2 = diagonals2[i];
   }
  
  }
  
  return (d1 | d2) ^ k;
}

void testBishop() {
  int pos; 
  FILE *in_file, *out_file;
  unsigned long mask;
  int moveCount;
  char str[200];

  unsigned long calcMask;
  int calcMoves;


  printf("Testing Bishop Moves\n");

  for (int i = 0; i < 10; i++) {
    sprintf(str, "./0.BITS/4.Bitboard - Слон/test.%d.in", i);
    in_file = fopen(str, "r");
    fscanf(in_file, "%d", &pos);

    sprintf(str, "./0.BITS/4.Bitboard - Слон/test.%d.out", i);
    out_file = fopen(str, "r");
    fscanf(out_file, "%d", &moveCount);
    fscanf(out_file, "%lu", &mask);
    
    calcMask = getBishopMoves(pos);
    calcMoves = countMoves(mask);

    if (mask == calcMask && moveCount == calcMoves) {
      printf("%d ok\n", i);
    } else {
      printf("%d failed\n", i);
    }
  }
}

