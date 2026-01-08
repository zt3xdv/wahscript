# WahScript

A programming language that compiles to JavaScript.

```wahscript
gethis { readFile } from "fs"

bestie Person {
    wah constructor(name, age) {
        based.name = name
        based.age = age
    }
    
    wah greet() {
        slay(`Hey, I'm ${based.name}!`)
    }
    
    wah isAdult() {
        yeet based.age >= 18
    }
}

wah main() {
    bruh people = [
        rizz Person("Alice", 25),
        rizz Person("Bob", 17)
    ]
    
    people.forEach((person) => {
        person.greet()
        
        lowkey (person.isAdult()) {
            slay(person.name + " is an adult - periodt")
        } highkey {
            slay(person.name + " is not an adult - cap")
        }
    })
}

main()
```

## Install

```bash
git clone https://github.com/zt3xdv/wahscript.git
cd wahscript
npm install -g .
```

## Usage

```bash
wahscript file.ws           # compile and print
wahscript file.ws -o out.js # compile to file
wahscript -r file.ws        # compile and run
```

## Docs

- [Getting Started](docs/getting-started.md)
- [Syntax Reference](docs/syntax.md)
- [Examples](docs/examples.md)
