import { HashMap, HashSet } from "./index.js";

const list = new HashMap();
const test = new HashSet();
// list.set("Rama", "old value");
// list.set("Rama", "that value");
// list.set("John", "k value");
// list.set("Rob", "a value");
// list.set("Skin", "dd value");
// list.set("Sita", "new value");
// console.log(list.remove("Sita"));

 list.set('apple', 'red')
 list.set('banana', 'yellow')
 list.set('carrot', 'orange')
 list.set('dog', 'brown')
 list.set('elephant', 'gray')
 list.set('frog', 'green')
 list.set('grape', 'purple')
 list.set('hat', 'black')
 list.set('ice cream', 'white')
 list.set('jacket', 'blue')
 list.set('kite', 'pink')
 list.set('lion', 'golden')

// console.log(list.keys());
// console.log(list.get("apple"));
// console.log(list.values());
// console.table(list.entries());

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
console.log(test.get("dog"));
console.log(test.entries());

