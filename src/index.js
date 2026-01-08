/**
 * WahScript - The language that compiles to JavaScript
 */

const { Lexer } = require('./lexer');
const { Transpiler } = require('./transpiler');

function compile(source) {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  
  const transpiler = new Transpiler(tokens);
  const javascript = transpiler.transpile();
  
  return javascript;
}

module.exports = { compile, Lexer, Transpiler };
