function PQ(cmp) {
  let head;

  function makeItem(value) {
    return {
      value,
      next: null
    }
  }

  function enqueue(value) {
    if (!head) {
      head = makeItem(value)
      return head;
    }

    if (cmp(head.value, value)) {
      const item = makeItem(value);
      item.next = head;
      head = item;
      return item;
    }

    let current = head;

    while (current) {
      if (current.next && cmp(current.next.value, value)) {
        const item = makeItem(value);
        item.next = current.next;
        current.next = item;
        return head;
      }

      if (!current.next) {
        const item = makeItem(value);
        item.next = current.next;
        current.next = item;
        return head;
      }

      current = current.next;
    }

    return head;
  }

  function dequeue() {
    const value = head.value;
    head = head.next;
    return value;
  }

  function printList() {
    let item = head;
    while (item) {
      console.log("%d", item.value);
      item = item.next;
    }
  }

  return {
    enqueue,
    dequeue,
    printList
  }
}

export default PQ;

// const pq = PQ((a, b) => a.value < b.value);

// pq.enqueue({value: 45});
// pq.enqueue({value: 15});
// pq.enqueue({value: 5});
// pq.enqueue({value: 89});
// pq.enqueue({value: 14});
// pq.enqueue({value: 16});
// // // pq.printList();

// console.log(pq.dequeue())
// console.log(pq.dequeue())
// console.log(pq.dequeue())




