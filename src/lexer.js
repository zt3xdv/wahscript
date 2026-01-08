/**
 * WahScript Lexer - Tokenizes source code
 */

const TokenType = {
  // Keywords
  WAH: 'WAH',           // function
  GETHIS: 'GETHIS',     // import
  YEET: 'YEET',         // return
  BRUH: 'BRUH',         // const
  NOCAP: 'NOCAP',       // let
  SLAY: 'SLAY',         // console.log
  PERIODT: 'PERIODT',   // true
  CAP: 'CAP',           // false
  LOWKEY: 'LOWKEY',     // if
  HIGHKEY: 'HIGHKEY',   // else
  VIBIN: 'VIBIN',       // while
  HITS: 'HITS',         // for
  GHOSTED: 'GHOSTED',   // null
  FINNA: 'FINNA',       // async
  SHEESH: 'SHEESH',     // await
  BESTIE: 'BESTIE',     // class
  RIZZ: 'RIZZ',         // new
  STAN: 'STAN',         // extends
  FLEX: 'FLEX',         // export
  BASED: 'BASED',       // this
  DRIP: 'DRIP',         // try
  CAUGHT: 'CAUGHT',     // catch
  GOAT: 'GOAT',         // super
  
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',
  
  // Operators
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  STAR: 'STAR',
  SLASH: 'SLASH',
  PERCENT: 'PERCENT',
  EQUALS: 'EQUALS',
  DOUBLE_EQUALS: 'DOUBLE_EQUALS',
  TRIPLE_EQUALS: 'TRIPLE_EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  STRICT_NOT_EQUALS: 'STRICT_NOT_EQUALS',
  LESS: 'LESS',
  GREATER: 'GREATER',
  LESS_EQUALS: 'LESS_EQUALS',
  GREATER_EQUALS: 'GREATER_EQUALS',
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  ARROW: 'ARROW',
  PLUS_EQUALS: 'PLUS_EQUALS',
  MINUS_EQUALS: 'MINUS_EQUALS',
  PLUS_PLUS: 'PLUS_PLUS',
  MINUS_MINUS: 'MINUS_MINUS',
  
  // Delimiters
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  LBRACE: 'LBRACE',
  RBRACE: 'RBRACE',
  LBRACKET: 'LBRACKET',
  RBRACKET: 'RBRACKET',
  COMMA: 'COMMA',
  DOT: 'DOT',
  SEMICOLON: 'SEMICOLON',
  COLON: 'COLON',
  QUESTION: 'QUESTION',
  BACKTICK: 'BACKTICK',
  TEMPLATE_STRING: 'TEMPLATE_STRING',
  SPREAD: 'SPREAD',
  
  // Special
  NEWLINE: 'NEWLINE',
  EOF: 'EOF',
  COMMENT: 'COMMENT'
};

const KEYWORDS = {
  'wah': TokenType.WAH,
  'gethis': TokenType.GETHIS,
  'yeet': TokenType.YEET,
  'bruh': TokenType.BRUH,
  'nocap': TokenType.NOCAP,
  'slay': TokenType.SLAY,
  'periodt': TokenType.PERIODT,
  'cap': TokenType.CAP,
  'lowkey': TokenType.LOWKEY,
  'highkey': TokenType.HIGHKEY,
  'vibin': TokenType.VIBIN,
  'hits': TokenType.HITS,
  'ghosted': TokenType.GHOSTED,
  'finna': TokenType.FINNA,
  'sheesh': TokenType.SHEESH,
  'bestie': TokenType.BESTIE,
  'rizz': TokenType.RIZZ,
  'stan': TokenType.STAN,
  'flex': TokenType.FLEX,
  'based': TokenType.BASED,
  'drip': TokenType.DRIP,
  'caught': TokenType.CAUGHT,
  'goat': TokenType.GOAT
};

class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }
}

class Lexer {
  constructor(source) {
    this.source = source;
    this.tokens = [];
    this.current = 0;
    this.line = 1;
    this.column = 1;
  }
  
  tokenize() {
    while (!this.isAtEnd()) {
      this.scanToken();
    }
    this.tokens.push(new Token(TokenType.EOF, null, this.line, this.column));
    return this.tokens;
  }
  
  scanToken() {
    const char = this.advance();
    
    switch (char) {
      case '(': this.addToken(TokenType.LPAREN, '('); break;
      case ')': this.addToken(TokenType.RPAREN, ')'); break;
      case '{': this.addToken(TokenType.LBRACE, '{'); break;
      case '}': this.addToken(TokenType.RBRACE, '}'); break;
      case '[': this.addToken(TokenType.LBRACKET, '['); break;
      case ']': this.addToken(TokenType.RBRACKET, ']'); break;
      case ',': this.addToken(TokenType.COMMA, ','); break;
      case ';': this.addToken(TokenType.SEMICOLON, ';'); break;
      case ':': this.addToken(TokenType.COLON, ':'); break;
      case '?': this.addToken(TokenType.QUESTION, '?'); break;
      
      case '.':
        if (this.match('.') && this.match('.')) {
          this.addToken(TokenType.SPREAD, '...');
        } else {
          this.addToken(TokenType.DOT, '.');
        }
        break;
      
      case '+':
        if (this.match('+')) this.addToken(TokenType.PLUS_PLUS, '++');
        else if (this.match('=')) this.addToken(TokenType.PLUS_EQUALS, '+=');
        else this.addToken(TokenType.PLUS, '+');
        break;
        
      case '-':
        if (this.match('-')) this.addToken(TokenType.MINUS_MINUS, '--');
        else if (this.match('=')) this.addToken(TokenType.MINUS_EQUALS, '-=');
        else this.addToken(TokenType.MINUS, '-');
        break;
        
      case '*': this.addToken(TokenType.STAR, '*'); break;
      case '%': this.addToken(TokenType.PERCENT, '%'); break;
      
      case '/':
        if (this.match('/')) {
          while (this.peek() !== '\n' && !this.isAtEnd()) {
            this.advance();
          }
        } else if (this.match('*')) {
          while (!this.isAtEnd() && !(this.peek() === '*' && this.peekNext() === '/')) {
            if (this.peek() === '\n') {
              this.line++;
              this.column = 0;
            }
            this.advance();
          }
          if (!this.isAtEnd()) {
            this.advance();
            this.advance();
          }
        } else {
          this.addToken(TokenType.SLASH, '/');
        }
        break;
      
      case '=':
        if (this.match('=')) {
          if (this.match('=')) this.addToken(TokenType.TRIPLE_EQUALS, '===');
          else this.addToken(TokenType.DOUBLE_EQUALS, '==');
        } else if (this.match('>')) {
          this.addToken(TokenType.ARROW, '=>');
        } else {
          this.addToken(TokenType.EQUALS, '=');
        }
        break;
        
      case '!':
        if (this.match('=')) {
          if (this.match('=')) this.addToken(TokenType.STRICT_NOT_EQUALS, '!==');
          else this.addToken(TokenType.NOT_EQUALS, '!=');
        } else {
          this.addToken(TokenType.NOT, '!');
        }
        break;
        
      case '<':
        if (this.match('=')) this.addToken(TokenType.LESS_EQUALS, '<=');
        else this.addToken(TokenType.LESS, '<');
        break;
        
      case '>':
        if (this.match('=')) this.addToken(TokenType.GREATER_EQUALS, '>=');
        else this.addToken(TokenType.GREATER, '>');
        break;
        
      case '&':
        if (this.match('&')) this.addToken(TokenType.AND, '&&');
        break;
        
      case '|':
        if (this.match('|')) this.addToken(TokenType.OR, '||');
        break;
      
      case '"':
      case "'":
        this.string(char);
        break;
        
      case '`':
        this.templateString();
        break;
      
      case '\n':
        this.line++;
        this.column = 1;
        break;
        
      case ' ':
      case '\r':
      case '\t':
        break;
        
      default:
        if (this.isDigit(char)) {
          this.number(char);
        } else if (this.isAlpha(char)) {
          this.identifier(char);
        }
        break;
    }
  }
  
  string(quote) {
    let value = '';
    while (this.peek() !== quote && !this.isAtEnd()) {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      if (this.peek() === '\\' && this.peekNext() === quote) {
        this.advance();
      }
      value += this.advance();
    }
    if (!this.isAtEnd()) this.advance();
    this.addToken(TokenType.STRING, value);
  }
  
  templateString() {
    let value = '`';
    while (this.peek() !== '`' && !this.isAtEnd()) {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      value += this.advance();
    }
    if (!this.isAtEnd()) {
      value += this.advance();
    }
    this.addToken(TokenType.TEMPLATE_STRING, value);
  }
  
  number(firstDigit) {
    let value = firstDigit;
    while (this.isDigit(this.peek())) {
      value += this.advance();
    }
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      value += this.advance();
      while (this.isDigit(this.peek())) {
        value += this.advance();
      }
    }
    this.addToken(TokenType.NUMBER, parseFloat(value));
  }
  
  identifier(firstChar) {
    let value = firstChar;
    while (this.isAlphaNumeric(this.peek())) {
      value += this.advance();
    }
    const type = KEYWORDS[value.toLowerCase()] || TokenType.IDENTIFIER;
    this.addToken(type, value);
  }
  
  isDigit(char) {
    return char >= '0' && char <= '9';
  }
  
  isAlpha(char) {
    return (char >= 'a' && char <= 'z') ||
           (char >= 'A' && char <= 'Z') ||
           char === '_' || char === '$';
  }
  
  isAlphaNumeric(char) {
    return this.isDigit(char) || this.isAlpha(char);
  }
  
  advance() {
    this.column++;
    return this.source[this.current++];
  }
  
  peek() {
    if (this.isAtEnd()) return '\0';
    return this.source[this.current];
  }
  
  peekNext() {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source[this.current + 1];
  }
  
  match(expected) {
    if (this.isAtEnd()) return false;
    if (this.source[this.current] !== expected) return false;
    this.current++;
    this.column++;
    return true;
  }
  
  isAtEnd() {
    return this.current >= this.source.length;
  }
  
  addToken(type, value) {
    this.tokens.push(new Token(type, value, this.line, this.column));
  }
}

module.exports = { Lexer, TokenType, Token };
