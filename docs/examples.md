# Examples

## Hello World

```wahscript
slay("Hello, World!")
```

## FizzBuzz

```wahscript
hits (nocap i = 1; i <= 100; i++) {
    lowkey (i % 15 === 0) {
        slay("FizzBuzz")
    } highkey lowkey (i % 3 === 0) {
        slay("Fizz")
    } highkey lowkey (i % 5 === 0) {
        slay("Buzz")
    } highkey {
        slay(i)
    }
}
```

## Fibonacci

```wahscript
wah fibonacci(n) {
    lowkey (n <= 1) {
        yeet n
    }
    yeet fibonacci(n - 1) + fibonacci(n - 2)
}

hits (nocap i = 0; i < 10; i++) {
    slay(fibonacci(i))
}
```

## Factorial

```wahscript
wah factorial(n) {
    lowkey (n <= 1) {
        yeet 1
    }
    yeet n * factorial(n - 1)
}

slay(factorial(5))  // 120
```

## Array Operations

```wahscript
bruh numbers = [1, 2, 3, 4, 5]

// Map
bruh doubled = numbers.map((n) => n * 2)
slay(doubled)

// Filter
bruh evens = numbers.filter((n) => n % 2 === 0)
slay(evens)

// Reduce
bruh sum = numbers.reduce((acc, n) => acc + n, 0)
slay(sum)
```

## Async/Await

```wahscript
finna wah fetchUser(id) {
    drip {
        bruh response = sheesh fetch(`https://api.example.com/users/${id}`)
        bruh user = sheesh response.json()
        yeet user
    } caught (error) {
        slay("Failed to fetch user: " + error)
        yeet ghosted
    }
}

finna wah main() {
    bruh user = sheesh fetchUser(1)
    lowkey (user !== ghosted) {
        slay("Got user: " + user.name)
    }
}

main()
```

## Class with Inheritance

```wahscript
bestie Shape {
    wah constructor(color) {
        based.color = color
    }
    
    wah describe() {
        yeet `A ${based.color} shape`
    }
}

bestie Circle stan Shape {
    wah constructor(color, radius) {
        goat(color)
        based.radius = radius
    }
    
    wah area() {
        yeet 3.14159 * based.radius * based.radius
    }
    
    wah describe() {
        yeet `A ${based.color} circle with radius ${based.radius}`
    }
}

bruh circle = rizz Circle("red", 5)
slay(circle.describe())
slay("Area: " + circle.area())
```

## Event Handler Pattern

```wahscript
bestie EventEmitter {
    wah constructor() {
        based.events = {}
    }
    
    wah on(event, callback) {
        lowkey (!based.events[event]) {
            based.events[event] = []
        }
        based.events[event].push(callback)
    }
    
    wah emit(event, data) {
        lowkey (based.events[event]) {
            based.events[event].forEach((cb) => cb(data))
        }
    }
}

bruh emitter = rizz EventEmitter()

emitter.on("message", (msg) => {
    slay("Received: " + msg)
})

emitter.emit("message", "Hello!")
```

## Simple Counter

```wahscript
wah createCounter() {
    nocap count = 0
    
    yeet {
        increment: () => {
            count++
            yeet count
        },
        decrement: () => {
            count--
            yeet count
        },
        get: () => count
    }
}

bruh counter = createCounter()
slay(counter.increment())  // 1
slay(counter.increment())  // 2
slay(counter.decrement())  // 1
slay(counter.get())        // 1
```
