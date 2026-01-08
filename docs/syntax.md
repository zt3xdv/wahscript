# Syntax Reference

## Keywords

| WahScript | JavaScript | Description |
|-----------|------------|-------------|
| `wah` | `function` | Function declaration |
| `gethis` | `import` | Import modules |
| `flex` | `export` | Export |
| `yeet` | `return` | Return value |
| `bruh` | `const` | Constant |
| `nocap` | `let` | Variable |
| `slay()` | `console.log()` | Print output |
| `periodt` | `true` | Boolean true |
| `cap` | `false` | Boolean false |
| `ghosted` | `null` | Null value |
| `lowkey` | `if` | If statement |
| `highkey` | `else` | Else statement |
| `vibin` | `while` | While loop |
| `hits` | `for` | For loop |
| `finna` | `async` | Async function |
| `sheesh` | `await` | Await promise |
| `bestie` | `class` | Class declaration |
| `stan` | `extends` | Class inheritance |
| `rizz` | `new` | New instance |
| `based` | `this` | This reference |
| `goat` | `super` | Super/parent class |
| `drip` | `try` | Try block |
| `caught` | `catch` | Catch block |

## Variables

```wahscript
// Constant (cannot be reassigned)
bruh name = "WahScript"

// Variable (can be reassigned)
nocap counter = 0
counter = counter + 1
```

## Functions

```wahscript
// Basic function
wah greet(name) {
    slay("Hello, " + name)
    yeet periodt
}

// With default parameter
wah calculate(a, b = 10) {
    yeet a + b
}

// Arrow function
bruh double = (x) => x * 2

// Arrow function with block
bruh add = (a, b) => {
    yeet a + b
}
```

## Async Functions

```wahscript
finna wah fetchData(url) {
    bruh response = sheesh fetch(url)
    bruh data = sheesh response.json()
    yeet data
}
```

## Conditionals

```wahscript
lowkey (age >= 18) {
    slay("You're an adult")
} highkey lowkey (age >= 13) {
    slay("You're a teenager")
} highkey {
    slay("You're a kid")
}

// Ternary
bruh status = age >= 18 ? "adult" : "minor"
```

## Loops

```wahscript
// While loop
nocap i = 0
vibin (i < 5) {
    slay(i)
    i++
}

// For loop
hits (nocap j = 0; j < 10; j++) {
    slay(j)
}
```

## Classes

```wahscript
bestie Animal {
    wah constructor(name) {
        based.name = name
    }
    
    wah speak() {
        slay(based.name + " makes a sound")
    }
}

// Inheritance
bestie Dog stan Animal {
    wah constructor(name, breed) {
        goat(name)
        based.breed = breed
    }
    
    wah speak() {
        slay(based.name + " barks!")
    }
}

bruh dog = rizz Dog("Rex", "German Shepherd")
dog.speak()
```

## Error Handling

```wahscript
drip {
    bruh result = riskyOperation()
    slay(result)
} caught (error) {
    slay("Error: " + error)
}
```

## Modules

```wahscript
// Import
gethis { something } from "module"
gethis defaultExport from "module"
gethis * as mod from "module"

// Export
flex bruh API_KEY = "secret"
flex wah helper() { }
flex default MainClass
```

## Data Structures

```wahscript
// Arrays
bruh fruits = ["apple", "banana", "orange"]
slay(fruits[0])

// Objects
bruh user = {
    name: "John",
    age: 25,
    active: periodt
}
slay(user.name)

// Template strings
bruh message = `Hello ${user.name}, you are ${user.age} years old`
```
