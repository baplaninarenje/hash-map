export default function HashSet() {
  let capacity = 16;
  let buckets = Array(capacity);

  function grow() {
    const loadFactor = 0.75;
    if (length() > capacity * loadFactor) {
      const oldKeys = keys();
      capacity = capacity * 2;
      buckets = Array(capacity);
      oldKeys.forEach((key) => set(key));
    }
  }

  function print() {
    console.log(buckets);
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index] === undefined) buckets[index] = [key];
    else {
      let inserted = false;

      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i] === key) {
          inserted = true;
        }
      }

      if (inserted === false) buckets[index].push(key);
    }
    grow();
  }

  function has(key) {
    const index = hash(key);
    let output;
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index] === undefined) {
      output = false;
    } else {
      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i] === key) {
          output = buckets[index][i];
        }
      }
    }
    return output ? true : false;
  }

  function remove(key) {
    let isRemoved = false;
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index].length === 1 && buckets[index][0] === key) {
      delete buckets[index];
      isRemoved = true;
    } else {
      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i] === key) {
          buckets[index].splice([i], 1);
          isRemoved = true;
        }
      }
    }
    return isRemoved;
  }

  function length() {
    return buckets.flat().length;
  }

  function clear() {
    buckets = [];
  }

  function keys() {
    return buckets.flat();
  }

  return {
    print,
    set,
    has,
    remove,
    length,
    clear,
    keys,
  };
}
