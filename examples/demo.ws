// WahScript Demo

bruh name = "WahScript"
nocap counter = 0

wah greet(person) {
    slay("Hello, " + person + "!")
    yeet "Greetings from " + name
}

wah calculate(a, b = 10) {
    yeet a + b
}

bruh double = (x) => x * 2
bruh add = (a, b) => {
    yeet a + b
}

wah checkAge(age) {
    lowkey (age >= 18) {
        slay("You're an adult - periodt!")
        yeet periodt
    } highkey {
        slay("You're a minor - cap")
        yeet cap
    }
}

wah countTo(n) {
    nocap i = 0
    vibin (i < n) {
        slay("Counting: " + i)
        i++
    }
}

wah fibonacci(n) {
    nocap result = []
    hits (nocap i = 0; i < n; i++) {
        lowkey (i <= 1) {
            result[i] = i
        } highkey {
            result[i] = result[i - 1] + result[i - 2]
        }
    }
    yeet result
}

bestie Person {
    wah constructor(name, age) {
        based.name = name
        based.age = age
    }
    
    wah introduce() {
        slay("I'm " + based.name + " and I'm " + based.age + " years old")
    }
    
    wah isAdult() {
        yeet based.age >= 18
    }
}

bestie Student stan Person {
    wah constructor(name, age, major) {
        goat(name, age)
        based.major = major
    }
    
    wah study() {
        slay(based.name + " is studying " + based.major)
    }
}

finna wah fetchData() {
    bruh data = sheesh fetch("https://api.example.com/data")
    yeet data
}

wah safeOperation() {
    drip {
        bruh result = riskyOperation()
        yeet result
    } caught (error) {
        slay("Error occurred: " + error)
        yeet ghosted
    }
}

bruh fruits = ["apple", "pear", "grape"]
bruh user = {
    name: "John",
    age: 25,
    active: periodt
}

bruh message = counter > 0 ? "Has items" : "Is empty"
bruh greeting = `Hello ${name}, welcome!`

// Run demo
slay("=== WahScript Demo ===")
greet("World")
slay("2 + 2 = " + calculate(2, 2))
slay("Double 5: " + double(5))
checkAge(20)
slay("Fibonacci 10: " + fibonacci(10))

bruh john = rizz Person("John", 25)
john.introduce()

bruh maria = rizz Student("Maria", 20, "Engineering")
maria.introduce()
maria.study()

slay("=== End Demo ===")
