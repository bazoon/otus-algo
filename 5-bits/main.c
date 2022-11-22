#include <string.h>
#include <stdio.h>
#include "./count.h"
#include "./king.h"
#include "./knight.h"
#include "./bishop.h"
#include "./rook.h"
#include "./queen.h"

void main() {
  /* unsigned long mask = getQueenMoves(31); */
  /* printf("%lu %d", mask, countMoves(mask)); */
  testKing();
  testKnight();
  testRook();
  testBishop();
  testQueen();
}
