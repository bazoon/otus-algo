
int countMoves(unsigned long mask) {
  int count = 0;
  while (mask) {
    if (mask & 1) count++;
    mask >>= 1;
  }
  return count;
}

int countMoves2(unsigned long mask) {
  int count = 0;
  while (mask) {
    count++;
    mask &= mask - 1;
  }
  
  return count;
}

int bits[256];

for (int i = 0; i < 256; i++) {
  bits[i] =countMoves2(i)
}

int countMoves3(unsigned long mask) {
  int count = 0;
  while (mask) {
    count += bits[mask & 255];
    mask >>= 8;
  }
  
  return count;
}
