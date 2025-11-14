let obj={};
obj.name="rohan";
//now every keys have following properties ---> value  , writable , enumerable ,configurable
// writable: Controls whether the property's value can be changed.  
// enumerable: Controls whether the property appears in loops or Object.keys().  
// configurable: Controls whether the property can be deleted or redefined.

console.log(Object.getOwnPropertyDescriptor(obj,'name'));


// Let's create an object
let person = { name: "John" };

// Define a custom property with specific descriptors
Object.defineProperty(person, "age", {
  value: 25,          // value of the property
  writable: false,    // ❌ cannot change value if false
  enumerable: true,   // ✅ will appear in loops if true
  configurable: false // ❌ cannot delete or redefine property if false
});

// Try changing the value (writable test)
person.age = 30; // This won't change because writable is false
console.log(person.age); // Output: 25

// Try listing all properties (enumerable test)
for (let key in person) {
  console.log(key); // name, age → appears because enumerable = true
}

// Try deleting the property (configurable test)
delete person.age; // Won't delete because configurable = false
console.log(person.age); // Output: 25
