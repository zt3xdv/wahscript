#!/usr/bin/env node

/**
 * WahScript CLI - Compiles .ws files to JavaScript
 */

const fs = require('fs');
const path = require('path');
const { compile } = require('../src/index');

const args = process.argv.slice(2);

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const c = colors;

function showBanner() {
  console.log(`
${c.magenta}${c.bold}    ╦ ╦╔═╗╦ ╦╔═╗╔═╗╦═╗╦╔═╗╔╦╗${c.reset}
${c.cyan}${c.bold}    ║║║╠═╣╠═╣╚═╗║  ╠╦╝║╠═╝ ║ ${c.reset}
${c.blue}${c.bold}    ╚╩╝╩ ╩╩ ╩╚═╝╚═╝╩╚═╩╩   ╩ ${c.reset}
${c.dim}    The language that slays${c.reset}
`);
}

function showHelp() {
  showBanner();
  
  console.log(`${c.bold}${c.white}  USAGE${c.reset}`);
  console.log(`    ${c.cyan}wahscript${c.reset} ${c.dim}<file.ws>${c.reset}              Compile and print output`);
  console.log(`    ${c.cyan}wahscript${c.reset} ${c.dim}<file.ws>${c.reset} ${c.yellow}-o${c.reset} ${c.dim}<out.js>${c.reset}   Compile to file`);
  console.log(`    ${c.cyan}wahscript${c.reset} ${c.yellow}-r${c.reset} ${c.dim}<file.ws>${c.reset}           Compile and run`);
  console.log(`    ${c.cyan}wahscript${c.reset} ${c.yellow}-h${c.reset}, ${c.yellow}--help${c.reset}            Show this help`);
  console.log();
  
  console.log(`${c.bold}${c.white}  EXAMPLES${c.reset}`);
  console.log(`    ${c.dim}$${c.reset} wahscript hello.ws`);
  console.log(`    ${c.dim}$${c.reset} wahscript app.ws -o dist/app.js`);
  console.log(`    ${c.dim}$${c.reset} wahscript -r script.ws`);
  console.log();
  
  console.log(`${c.bold}${c.white}  DOCS${c.reset}`);
  console.log(`    ${c.dim}See${c.reset} ${c.cyan}docs/syntax.md${c.reset} ${c.dim}for syntax reference${c.reset}`);
  console.log();
}

function success(msg) {
  console.log(`${c.green}${c.bold}  ✓${c.reset} ${msg}`);
}

function error(msg) {
  console.log(`${c.red}${c.bold}  ✗${c.reset} ${msg}`);
}

function info(msg) {
  console.log(`${c.cyan}${c.bold}  ●${c.reset} ${msg}`);
}

function main() {
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }
  
  let inputFile = null;
  let outputFile = null;
  let runAfterCompile = false;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-o' && args[i + 1]) {
      outputFile = args[++i];
    } else if (args[i] === '-r') {
      runAfterCompile = true;
    } else if (!args[i].startsWith('-')) {
      inputFile = args[i];
    }
  }
  
  if (!inputFile) {
    error('No input file specified');
    process.exit(1);
  }
  
  const filePath = path.resolve(inputFile);
  
  if (!fs.existsSync(filePath)) {
    error(`File not found: ${c.dim}${filePath}${c.reset}`);
    process.exit(1);
  }
  
  const source = fs.readFileSync(filePath, 'utf-8');
  
  try {
    const startTime = Date.now();
    const javascript = compile(source);
    const elapsed = Date.now() - startTime;
    
    if (outputFile) {
      const outPath = path.resolve(outputFile);
      const outDir = path.dirname(outPath);
      
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      
      fs.writeFileSync(outPath, javascript);
      success(`Compiled ${c.cyan}${inputFile}${c.reset} → ${c.green}${outputFile}${c.reset} ${c.dim}(${elapsed}ms)${c.reset}`);
    } else if (runAfterCompile) {
      console.log();
      info(`Running ${c.cyan}${inputFile}${c.reset}`);
      console.log(`${c.dim}  ${'─'.repeat(50)}${c.reset}`);
      console.log();
      eval(javascript);
      console.log();
    } else {
      console.log(javascript);
    }
  } catch (err) {
    error(`Compilation failed: ${err.message}`);
    process.exit(1);
  }
}

main();
