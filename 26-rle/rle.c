#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
  char *source;
  int length;
} Content;

Content *readFile(char *fname) {
  Content *content = (Content *)malloc(sizeof(Content));

  char *source = NULL;
  FILE *fp = fopen(fname, "r");
  if (fp != NULL) {
    if (fseek(fp, 0L, SEEK_END) == 0) {
      long bufsize = ftell(fp);
      if (bufsize == -1) {}

      source = malloc(sizeof(char) * (bufsize + 1));

      if (fseek(fp, 0L, SEEK_SET) != 0) {  }

      size_t newLen = fread(source, sizeof(char), bufsize, fp);
      content->length = newLen;

      if ( ferror( fp ) != 0 ) {
        fputs("Error reading file", stderr);
      } else {
        source[newLen++] = '\0'; 
      }
    }
    fclose(fp);
  }

  content->source = source;

  return content;
}

void writeFile(char *fname, char *buffer) {
  FILE *fp = fopen(fname, "w+");
  fwrite (buffer, 1, strlen(buffer), fp);
  fclose(fp);
}


char *rle(char *s) {
  int len = strlen(s);
  char *out = (char *)malloc(len);
  bool done = false;
  int index = 0;
  int outIndex = 0;
  int count = 0;

  while(!done) {
    char c = s[index];
    count = 0;

    while(s[index] == c &&index < len - 1) {
      count++;
      index++;
    }

    out[outIndex] = count;
    out[outIndex + 1] = c;
    
    outIndex += 2;

    if (index == len - 1) 
      done = true;
  }

  return out;
}

int findDistinct(char *s, int index) {
  char c = s[index];
  int len = strlen(s);

  while (index < len - 1 && s[index] != s[index+1]) {
    index++;
  }

  if (s[index] == s[index+1]) index--;

  return index;
}


char *rle2(Content *content) {
  int len = content->length;
  char *s = content->source;
  char *out = (char *)malloc(len);
  bool done = false;
  int index = 0;
  int outIndex = 0;
  int count = 0;

  while(!done) {
    char c = s[index];
    count = 0;

    int distinctIndex = findDistinct(s, index);

    if (distinctIndex > index) {
      int distinctCount = distinctIndex - index + 1;
      out[outIndex++] = -distinctCount;
      for (int i = index;i<=distinctIndex;i++) {
        out[outIndex++] = s[index++];
      }
      
      c = s[distinctIndex + 1];
    }

    while(s[index] == c &&index < len - 1) {
      count++;
      index++;
    }

    out[outIndex] = count;
    out[outIndex + 1] = c;
    
    outIndex += 2;

    if (index >= len - 1) 
      done = true;
  }

  printf("out: %d\n", outIndex);

  return out;
}

char *rle2Decode(char *s) {
  int len = strlen(s);
  int outLen = 0;
  int index = 0;
  int outIndex = 0;


  while (index < len) {
    char c = s[index];

    if (c > 0) {
      outLen += c;
      index += 2;
    } else {
      outLen += -c;
      index += -c + 1;
    }
  }

  char *out = malloc(outLen+1);
  index = 0;

  while(index < len) {
    char c = s[index];

    if (c > 0) {
      char symbol = s[index + 1];
      while(--c >= 0) {
        out[outIndex++] = symbol;
      }

      index += 2;
    } else {
      index++;
      while(c++) {
        out[outIndex++] = s[index++];
      }
    }
  }

  out[outIndex] = '\0';
  return out;
  /* printf("%d\n", outLen); */
}

void main() {
  /* char *s = rle2("aaabcdefggggg"); */
  /* rle2Decode(s); */

  Content *content = readFile("./in.txt");
  printf("%d", content->length);
  char *s2 = rle2(content);
  /* writeFile("./out.p", s2); */

  /* char *s3 = readFile("./out.txt"); */
  /* char *s4 = rle2Decode(s3); */

  /* writeFile("./outd.txt", s4); */

  /* printf("%d", findDistinct("aaabcdef", 3)); */
}
