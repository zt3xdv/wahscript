/**
 * WahScript Transpiler - Converts tokens to JavaScript
 */

const { TokenType } = require('./lexer');

class Transpiler {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
    this.output = '';
    this.indentLevel = 0;
  }
  
  transpile() {
    while (!this.isAtEnd()) {
      this.statement();
    }
    return this.output;
  }
  
  statement() {
    const token = this.peek();
    
    switch (token.type) {
      case TokenType.GETHIS:
        this.importStatement();
        break;
      case TokenType.FLEX:
        this.exportStatement();
        break;
      case TokenType.WAH:
        this.functionDeclaration();
        break;
      case TokenType.FINNA:
        this.asyncFunction();
        break;
      case TokenType.BRUH:
        this.constDeclaration();
        break;
      case TokenType.NOCAP:
        this.letDeclaration();
        break;
      case TokenType.SLAY:
        this.consoleLog();
        break;
      case TokenType.YEET:
        this.returnStatement();
        break;
      case TokenType.LOWKEY:
        this.ifStatement();
        break;
      case TokenType.VIBIN:
        this.whileLoop();
        break;
      case TokenType.HITS:
        this.forLoop();
        break;
      case TokenType.BESTIE:
        this.classDeclaration();
        break;
      case TokenType.DRIP:
        this.tryCatch();
        break;
      case TokenType.SHEESH:
        this.awaitExpression();
        break;
      case TokenType.EOF:
        this.advance();
        break;
      default:
        this.expression();
        if (this.check(TokenType.SEMICOLON)) {
          this.advance();
        }
        this.emitLine(';');
        break;
    }
  }
  
  importStatement() {
    this.advance();
    this.emit('import ');
    
    if (this.check(TokenType.LBRACE)) {
      this.advance();
      this.emit('{ ');
      while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
        this.emit(this.advance().value);
        if (this.check(TokenType.COMMA)) {
          this.emit(', ');
          this.advance();
        }
      }
      this.expect(TokenType.RBRACE);
      this.emit(' }');
    } else if (this.check(TokenType.STAR)) {
      this.advance();
      this.emit('*');
      if (this.checkIdentifier('as')) {
        this.advance();
        this.emit(' as ');
        this.emit(this.advance().value);
      }
    } else {
      this.emit(this.advance().value);
    }
    
    if (this.checkIdentifier('from')) {
      this.advance();
      this.emit(' from ');
    }
    
    if (this.check(TokenType.STRING)) {
      this.emit(`"${this.advance().value}"`);
    }
    
    this.emitLine(';');
  }
  
  exportStatement() {
    this.advance();
    this.emit('export ');
    
    if (this.checkIdentifier('default')) {
      this.advance();
      this.emit('default ');
    }
    
    this.statement();
  }
  
  functionDeclaration() {
    this.advance();
    this.emit('function ');
    
    const name = this.advance().value;
    this.emit(name);
    
    this.params();
    this.block();
  }
  
  asyncFunction() {
    this.advance();
    this.emit('async ');
    
    if (this.check(TokenType.WAH)) {
      this.functionDeclaration();
    } else {
      this.expression();
    }
  }
  
  constDeclaration() {
    this.advance();
    this.emit('const ');
    this.variableBody();
  }
  
  letDeclaration() {
    this.advance();
    this.emit('let ');
    this.variableBody();
  }
  
  variableBody() {
    const name = this.advance().value;
    this.emit(name);
    
    if (this.check(TokenType.EQUALS)) {
      this.advance();
      this.emit(' = ');
      this.expression();
    }
    
    if (this.check(TokenType.SEMICOLON)) {
      this.advance();
    }
    this.emitLine(';');
  }
  
  consoleLog() {
    this.advance();
    this.emit('console.log');
    
    this.expect(TokenType.LPAREN);
    this.emit('(');
    
    this.expressionList();
    
    this.expect(TokenType.RPAREN);
    this.emitLine(');');
  }
  
  returnStatement() {
    this.advance();
    this.emit('return ');
    
    if (!this.check(TokenType.SEMICOLON) && !this.check(TokenType.RBRACE)) {
      this.expression();
    }
    
    if (this.check(TokenType.SEMICOLON)) {
      this.advance();
    }
    this.emitLine(';');
  }
  
  ifStatement() {
    this.advance();
    this.emit('if ');
    
    this.expect(TokenType.LPAREN);
    this.emit('(');
    this.expression();
    this.expect(TokenType.RPAREN);
    this.emit(') ');
    
    this.block();
    
    if (this.check(TokenType.HIGHKEY)) {
      this.advance();
      this.emit(' else ');
      if (this.check(TokenType.LOWKEY)) {
        this.ifStatement();
      } else {
        this.block();
      }
    }
  }
  
  whileLoop() {
    this.advance();
    this.emit('while ');
    
    this.expect(TokenType.LPAREN);
    this.emit('(');
    this.expression();
    this.expect(TokenType.RPAREN);
    this.emit(') ');
    
    this.block();
  }
  
  forLoop() {
    this.advance();
    this.emit('for ');
    
    this.expect(TokenType.LPAREN);
    this.emit('(');
    
    if (this.check(TokenType.BRUH)) {
      this.advance();
      this.emit('let ');
    } else if (this.check(TokenType.NOCAP)) {
      this.advance();
      this.emit('let ');
    }
    
    if (!this.check(TokenType.SEMICOLON)) {
      this.expression();
    }
    this.expect(TokenType.SEMICOLON);
    this.emit('; ');
    
    if (!this.check(TokenType.SEMICOLON)) {
      this.expression();
    }
    this.expect(TokenType.SEMICOLON);
    this.emit('; ');
    
    if (!this.check(TokenType.RPAREN)) {
      this.expression();
    }
    
    this.expect(TokenType.RPAREN);
    this.emit(') ');
    
    this.block();
  }
  
  classDeclaration() {
    this.advance();
    this.emit('class ');
    
    const name = this.advance().value;
    this.emit(name + ' ');
    
    if (this.check(TokenType.STAN)) {
      this.advance();
      this.emit('extends ');
      this.emit(this.advance().value + ' ');
    }
    
    this.classBlock();
  }
  
  classBlock() {
    this.expect(TokenType.LBRACE);
    this.emitLine('{');
    this.indentLevel++;
    
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      this.indent();
      
      if (this.check(TokenType.WAH)) {
        this.advance();
        const name = this.advance().value;
        this.emit(name);
        this.params();
        this.methodBlock();
      } else if (this.check(TokenType.FINNA)) {
        this.advance();
        this.emit('async ');
        if (this.check(TokenType.WAH)) {
          this.advance();
        }
        const name = this.advance().value;
        this.emit(name);
        this.params();
        this.methodBlock();
      } else {
        this.expression();
        this.emitLine('');
      }
    }
    
    this.indentLevel--;
    this.indent();
    this.expect(TokenType.RBRACE);
    this.emitLine('}');
  }
  
  methodBlock() {
    this.expect(TokenType.LBRACE);
    this.emitLine('{');
    this.indentLevel++;
    
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      this.indent();
      this.statement();
      if (this.output[this.output.length - 1] !== '\n') {
        this.emitLine('');
      }
    }
    
    this.indentLevel--;
    this.indent();
    this.expect(TokenType.RBRACE);
    this.emitLine('}');
  }
  
  tryCatch() {
    this.advance();
    this.emit('try ');
    this.block();
    
    if (this.check(TokenType.CAUGHT)) {
      this.advance();
      this.emit(' catch ');
      
      if (this.check(TokenType.LPAREN)) {
        this.advance();
        this.emit('(');
        this.emit(this.advance().value);
        this.expect(TokenType.RPAREN);
        this.emit(') ');
      }
      
      this.block();
    }
  }
  
  awaitExpression() {
    this.advance();
    this.emit('await ');
    this.expression();
  }
  
  params() {
    this.expect(TokenType.LPAREN);
    this.emit('(');
    
    while (!this.check(TokenType.RPAREN) && !this.isAtEnd()) {
      if (this.check(TokenType.SPREAD)) {
        this.emit('...');
        this.advance();
      }
      this.emit(this.advance().value);
      
      if (this.check(TokenType.EQUALS)) {
        this.advance();
        this.emit(' = ');
        this.expression();
      }
      
      if (this.check(TokenType.COMMA)) {
        this.emit(', ');
        this.advance();
      }
    }
    
    this.expect(TokenType.RPAREN);
    this.emit(') ');
  }
  
  block() {
    this.expect(TokenType.LBRACE);
    this.emitLine('{');
    this.indentLevel++;
    
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      this.indent();
      this.statement();
    }
    
    this.indentLevel--;
    this.indent();
    this.expect(TokenType.RBRACE);
    this.emitLine('}');
  }
  
  expressionList() {
    this.expression();
    while (this.check(TokenType.COMMA)) {
      this.emit(', ');
      this.advance();
      this.expression();
    }
  }
  
  expression() {
    this.ternary();
  }
  
  ternary() {
    this.or();
    
    if (this.check(TokenType.QUESTION)) {
      this.advance();
      this.emit(' ? ');
      this.expression();
      this.expect(TokenType.COLON);
      this.emit(' : ');
      this.expression();
    }
  }
  
  or() {
    this.and();
    
    while (this.check(TokenType.OR)) {
      this.advance();
      this.emit(' || ');
      this.and();
    }
  }
  
  and() {
    this.equality();
    
    while (this.check(TokenType.AND)) {
      this.advance();
      this.emit(' && ');
      this.equality();
    }
  }
  
  equality() {
    this.comparison();
    
    while (this.check(TokenType.DOUBLE_EQUALS) || 
           this.check(TokenType.TRIPLE_EQUALS) ||
           this.check(TokenType.NOT_EQUALS) ||
           this.check(TokenType.STRICT_NOT_EQUALS)) {
      const op = this.advance().value;
      this.emit(` ${op} `);
      this.comparison();
    }
  }
  
  comparison() {
    this.term();
    
    while (this.check(TokenType.LESS) || 
           this.check(TokenType.GREATER) ||
           this.check(TokenType.LESS_EQUALS) ||
           this.check(TokenType.GREATER_EQUALS)) {
      const op = this.advance().value;
      this.emit(` ${op} `);
      this.term();
    }
  }
  
  term() {
    this.factor();
    
    while (this.check(TokenType.PLUS) || this.check(TokenType.MINUS)) {
      const op = this.advance().value;
      this.emit(` ${op} `);
      this.factor();
    }
  }
  
  factor() {
    this.unary();
    
    while (this.check(TokenType.STAR) || 
           this.check(TokenType.SLASH) ||
           this.check(TokenType.PERCENT)) {
      const op = this.advance().value;
      this.emit(` ${op} `);
      this.unary();
    }
  }
  
  unary() {
    if (this.check(TokenType.NOT) || this.check(TokenType.MINUS)) {
      const op = this.advance().value;
      this.emit(op);
      this.unary();
    } else if (this.check(TokenType.SHEESH)) {
      this.advance();
      this.emit('await ');
      this.unary();
    } else if (this.check(TokenType.RIZZ)) {
      this.advance();
      this.emit('new ');
      this.postfix();
    } else {
      this.postfix();
    }
  }
  
  postfix() {
    this.primary();
    
    while (true) {
      if (this.check(TokenType.LPAREN)) {
        this.advance();
        this.emit('(');
        if (!this.check(TokenType.RPAREN)) {
          this.expressionList();
        }
        this.expect(TokenType.RPAREN);
        this.emit(')');
      } else if (this.check(TokenType.DOT)) {
        this.advance();
        this.emit('.');
        this.emit(this.advance().value);
      } else if (this.check(TokenType.LBRACKET)) {
        this.advance();
        this.emit('[');
        this.expression();
        this.expect(TokenType.RBRACKET);
        this.emit(']');
      } else if (this.check(TokenType.PLUS_PLUS)) {
        this.advance();
        this.emit('++');
      } else if (this.check(TokenType.MINUS_MINUS)) {
        this.advance();
        this.emit('--');
      } else if (this.check(TokenType.PLUS_EQUALS)) {
        this.advance();
        this.emit(' += ');
        this.expression();
      } else if (this.check(TokenType.MINUS_EQUALS)) {
        this.advance();
        this.emit(' -= ');
        this.expression();
      } else if (this.check(TokenType.EQUALS) && !this.checkNext(TokenType.EQUALS)) {
        this.advance();
        this.emit(' = ');
        this.expression();
      } else {
        break;
      }
    }
  }
  
  primary() {
    const token = this.peek();
    
    switch (token.type) {
      case TokenType.NUMBER:
        this.emit(this.advance().value.toString());
        break;
        
      case TokenType.STRING:
        this.emit(`"${this.advance().value}"`);
        break;
        
      case TokenType.TEMPLATE_STRING:
        this.emit(this.advance().value);
        break;
        
      case TokenType.PERIODT:
        this.advance();
        this.emit('true');
        break;
        
      case TokenType.CAP:
        this.advance();
        this.emit('false');
        break;
        
      case TokenType.GHOSTED:
        this.advance();
        this.emit('null');
        break;
        
      case TokenType.BASED:
        this.advance();
        this.emit('this');
        break;
        
      case TokenType.GOAT:
        this.advance();
        this.emit('super');
        break;
        
      case TokenType.IDENTIFIER:
        this.emit(this.advance().value);
        break;
        
      case TokenType.LPAREN:
        this.advance();
        this.emit('(');
        
        if (this.isArrowFunction()) {
          this.arrowFunctionParams();
        } else {
          this.expression();
          this.expect(TokenType.RPAREN);
          this.emit(')');
        }
        break;
        
      case TokenType.LBRACKET:
        this.arrayLiteral();
        break;
        
      case TokenType.LBRACE:
        this.objectLiteral();
        break;
        
      case TokenType.WAH:
        this.advance();
        this.emit('function');
        if (this.check(TokenType.IDENTIFIER)) {
          this.emit(' ' + this.advance().value);
        }
        this.params();
        this.block();
        break;
        
      case TokenType.FINNA:
        this.advance();
        this.emit('async ');
        if (this.check(TokenType.WAH)) {
          this.advance();
          this.emit('function');
          if (this.check(TokenType.IDENTIFIER)) {
            this.emit(' ' + this.advance().value);
          }
          this.params();
          this.block();
        } else if (this.check(TokenType.LPAREN)) {
          this.arrowFunction();
        }
        break;
        
      default:
        if (!this.isAtEnd()) {
          this.advance();
        }
        break;
    }
  }
  
  isArrowFunction() {
    let depth = 0;
    let pos = this.current;
    
    while (pos < this.tokens.length) {
      const t = this.tokens[pos];
      if (t.type === TokenType.LPAREN) depth++;
      if (t.type === TokenType.RPAREN) {
        depth--;
        if (depth < 0) {
          pos++;
          break;
        }
      }
      pos++;
    }
    
    return pos < this.tokens.length && this.tokens[pos].type === TokenType.ARROW;
  }
  
  arrowFunction() {
    this.advance();
    this.emit('(');
    this.arrowFunctionParams();
  }
  
  arrowFunctionParams() {
    while (!this.check(TokenType.RPAREN) && !this.isAtEnd()) {
      if (this.check(TokenType.SPREAD)) {
        this.emit('...');
        this.advance();
      }
      this.emit(this.advance().value);
      
      if (this.check(TokenType.EQUALS)) {
        this.advance();
        this.emit(' = ');
        this.expression();
      }
      
      if (this.check(TokenType.COMMA)) {
        this.emit(', ');
        this.advance();
      }
    }
    
    this.expect(TokenType.RPAREN);
    this.emit(') ');
    this.expect(TokenType.ARROW);
    this.emit('=> ');
    
    if (this.check(TokenType.LBRACE)) {
      this.block();
    } else {
      this.expression();
    }
  }
  
  arrayLiteral() {
    this.advance();
    this.emit('[');
    
    if (!this.check(TokenType.RBRACKET)) {
      this.expressionList();
    }
    
    this.expect(TokenType.RBRACKET);
    this.emit(']');
  }
  
  objectLiteral() {
    this.advance();
    this.emit('{ ');
    
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.STRING)) {
        this.emit(`"${this.advance().value}"`);
      } else if (this.check(TokenType.LBRACKET)) {
        this.advance();
        this.emit('[');
        this.expression();
        this.expect(TokenType.RBRACKET);
        this.emit(']');
      } else {
        this.emit(this.advance().value);
      }
      
      if (this.check(TokenType.COLON)) {
        this.advance();
        this.emit(': ');
        this.expression();
      }
      
      if (this.check(TokenType.COMMA)) {
        this.emit(', ');
        this.advance();
      }
    }
    
    this.expect(TokenType.RBRACE);
    this.emit(' }');
  }
  
  peek() {
    return this.tokens[this.current];
  }
  
  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }
  
  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }
  
  checkNext(type) {
    if (this.current + 1 >= this.tokens.length) return false;
    return this.tokens[this.current + 1].type === type;
  }
  
  checkIdentifier(name) {
    return this.check(TokenType.IDENTIFIER) && 
           this.peek().value.toLowerCase() === name;
  }
  
  expect(type) {
    if (this.check(type)) {
      return this.advance();
    }
    throw new Error(`Expected ${type} but got ${this.peek().type} at line ${this.peek().line}`);
  }
  
  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }
  
  emit(str) {
    this.output += str;
  }
  
  emitLine(str) {
    this.output += str + '\n';
  }
  
  indent() {
    this.output += '  '.repeat(this.indentLevel);
  }
}

module.exports = { Transpiler };
