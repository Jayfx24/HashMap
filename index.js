export class HashMap {
  constructor() {
    this.load = 0.75;
    this.capacity = 16;
    this.bucket = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    if (!key) throw new Error("Try again with a key!!");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    
    // if beyond load increase the capacity 2X
    // console.log(index)

    if (!this.bucket[index]) {
      this.bucket[index] = [{ key, value }];
      this.size++;
      this.checkLoadFactorAndResize();
      // console.log(this.bucket)
      return;
    } else if (this.bucket[index]) {
      for (const i of this.bucket[index]) {
        if (i.key === key) {
          i.value = value;
          return;
        }
        this.bucket[index].push({ key, value });
        this.size++;
        this.checkLoadFactorAndResize();

        // console.log(this.bucket[index]);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
   
    if (!this.bucket[index]) return null;
    for (const i of this.bucket[index]) if (i.key === key) return i;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.bucket[index]) {
      for (const i of this.bucket[index]) if (i.key === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.bucket[index]) {
      this.bucket[index] = this.bucket[index].filter((k) => k.key !== key);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }
  clear() {
   
    this.bucket = new Array(this.capacity).fill(null);
    console.log(this.bucket);
  }

  keys() {
    return this.#recArr(0, (item) => item.key);
  }

  values() {
    return this.#recArr(0, (item) => item.value);
  }

  entries() {
    return this.#recArr(0, (item) => [item.key, item.value]);
  }

  #recArr(i = 0, mapper) {
    if (i === this.bucket.length) {
      return [];
    }
    let newArr = [];
    if (this.bucket[i]) {
      newArr = this.bucket[i].map(mapper);
    }
    return newArr.concat(this.#recArr(i + 1, mapper));
  }

  checkLoadFactorAndResize() {
    const limit = this.load * this.capacity;
    if (this.size > limit) {
      // console.table(this.bucket);
      this.size = 0;
      const values = this.entries();
      this.capacity *= 2;
      // console.log(this.capacity)
      this.bucket = new Array(this.capacity).fill(null);
      for (const item of values) {
        const [key, value] = item;
        this.set(key, value);
      }
      // console.table(this.bucket);
    }
  }
}

export class HashSet extends HashMap {
  constructor() {
    super();
  }
  set(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.bucket[index]) {
      this.bucket[index] = [{ key }];
      this.size++;
      this.checkLoadFactorAndResize();
      return;
    }
    for (const i of this.bucket[index]) {
      if (i.key === key) {
        return;
      }
    }
    this.bucket[index].push({ key });
    this.size++;
    this.checkLoadFactorAndResize();
  }
  values() {
    throw new Error("HashSet does not support values()");
  }
  entries() {
    return this.keys();
  }
}
