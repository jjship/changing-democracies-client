import { NarrationFragment } from "@/types/videosAndFilms";

export default class NarrationList {
  head: NarrationNode | null;
  current: NarrationNode | null;
  private length: number;

  constructor(fragments: NarrationFragment[]) {
    this.head = null;
    this.current = null;
    this.length = 0;
    this.initializeList(fragments);
  }

  initializeList(fragments: NarrationFragment[]) {
    fragments.forEach((fragment) => {
      this.addNode(fragment);
    });
  }

  addNode(fragmentData: NarrationFragment) {
    const newNode = new NarrationNode(fragmentData);
    this.length++;

    if (!this.head) {
      this.head = newNode;
      this.current = newNode;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = newNode;
    }
  }

  getNextFragment() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.data;
    }
    return null;
  }

  getPreviousFragment() {
    if (!this.head || !this.current) return null;

    if (this.current === this.head) return null;

    let temp = this.head;
    while (temp.next !== this.current) {
      temp = temp.next!;
    }

    this.current = temp;
    return this.current.data;
  }

  getCurrentFragment() {
    return this.current ? this.current.data : null;
  }

  jumpToFragment(index: number) {
    if (index < 0 || index >= this.length) return null;

    let temp = this.head;
    let currentIndex = 0;

    while (temp && currentIndex < index) {
      temp = temp.next;
      currentIndex++;
    }

    if (temp) {
      this.current = temp;
      return temp.data;
    }
    return null;
  }

  hasNext(): boolean {
    return !!(this.current && this.current.next);
  }

  hasPrevious(): boolean {
    if (!this.head || !this.current) return false;
    return this.current !== this.head;
  }

  getSize(): number {
    return this.length;
  }

  getCurrentIndex(): number {
    if (!this.current) return -1;

    let temp = this.head;
    let index = 0;

    while (temp !== this.current && temp?.next) {
      temp = temp.next;
      index++;
    }

    return index;
  }

  reset(): void {
    this.current = this.head;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}
