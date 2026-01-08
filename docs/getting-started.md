# Getting Started

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wahscript.git
cd wahscript

# Link globally (optional)
npm link
```

## Your First WahScript Program

Create a file called `hello.ws`:

```wahscript
slay("Hello, World!")
```

Compile and run:

```bash
node bin/wahscript.js -r hello.ws
```

Or compile to JavaScript:

```bash
node bin/wahscript.js hello.ws -o hello.js
```

## CLI Usage

```bash
wahscript <file.ws>              # Compile and print output
wahscript <file.ws> -o <out.js>  # Compile to file  
wahscript -r <file.ws>           # Compile and run
wahscript -h, --help             # Show help
```

## Next Steps

- Read the [Syntax Reference](./syntax.md) to learn all keywords
- Check out the [Examples](./examples.md) for common patterns
