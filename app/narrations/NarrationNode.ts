class NarrationNode {
  data: any;
  next: NarrationNode | null;

  constructor(fragmentData: any) {
    this.data = fragmentData;
    this.next = null;
  }
}
