export default function HashMap() {
  let capacity = 16;
  let buckets = Array(capacity);

  function grow() {
    const loadFactor = 0.75;
    if (length() > capacity * loadFactor) {
      const oldEntries = entries();
      capacity = capacity * 2;
      buckets = Array(capacity);
      oldEntries.forEach((entrie) => set(entrie[0], entrie[1]));
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

  function set(key, value) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index] === undefined) buckets[index] = [[key, value]];
    else {
      let inserted = false;

      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i][0] === key) {
          buckets[index][i][1] = value;
          inserted = true;
        }
      }

      if (inserted === false) buckets[index].push([key, value]);
    }
    grow();
  }

  function get(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index] === undefined) {
      return null;
    } else {
      let output;
      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i][0] === key) {
          output = buckets[index][i][1];
        }
      }
      return output ? output : null;
    }
  }

  function has(key) {
    return get(key) ? true : false;
  }

  function remove(key) {
    let isRemoved = false;
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (buckets[index].length === 1 && buckets[index][0][0] === key) {
      delete buckets[index];
      isRemoved = true;
    } else {
      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i][0] === key) {
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
    return buckets.flat().map((item) => item[0]);
  }

  function values() {
    return buckets.flat().map((item) => item[1]);
  }

  function entries() {
    return buckets.flat();
  }

  return {
    print,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    grow,
  };
}
