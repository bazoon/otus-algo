#include <stdio.h>
#include <string.h>
#include <stdlib.h>


typedef struct Item {
  int value;
  struct Item *next;
} Item;


Item *makeItem(int value) {
  Item *item = malloc(sizeof(Item));
  item->value = value;
  return item;
}

Item *enqueue(Item *head, int value) {
  if (head->value < value) {
    Item *item = makeItem(value);
    item->next = head;
    return item;
  }

  Item *current = head;

  while (current) {
    
    if (current->next && current->next->value < value) {
      Item *item = makeItem(value);
      item->next = current->next;
      current->next = item;
      return head;
    }

    if (!current->next) {
      Item *item = makeItem(value);
      item->next = current->next;
      current->next = item;
      return head;
    }
    
    current = current->next;
  }

  return head;
}

Item *dequeue(Item *head, int value) {
  return head -> next;
}


void printList(Item *head) {
  Item *item = head;
  while(item) {
    printf("%d\n", item->value);
    item = item->next;
  }
}

void main() {
  Item *item = makeItem(23);
  item = enqueue(item, 45);
  item = enqueue(item, 15);
  item = enqueue(item, 5);
  item = enqueue(item, 89);
  item = enqueue(item, 14);
  item = enqueue(item, 16);
  printList(item);
}
