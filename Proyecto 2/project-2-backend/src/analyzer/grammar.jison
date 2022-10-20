%{
    import { IError } from './exceptions/IError';
    import { EnumError } from './exceptions/EnumError';
    import { BreakLoopEx } from './exceptions/BreakLoopEx';
    import { ContinueLoopEx } from './exceptions/ContinueLoopEx';

    import { IStatement } from "./abstract/IStatement";

    import { Declaration } from "./statements/Declaration";
    import { Assign } from "./statements/Assign";
    import { If } from "./statements/If";
    import { Elif } from "./statements/Elif";
    import { Print } from "./statements/Print";
    import { Println } from "./statements/Println";
    import { While } from "./statements/While";
    import { BreakLoop } from "./statements/BreakLoop";
    import { ContinueLoop } from "./statements/ContinueLoop";

    import fnParseDatatype from "./functions/fnParseDatatype";
    import fnParseBoolean from "./functions/fnParseBoolean";

    import { Terminals } from "./enums/EnumTerminals";
    import { RelationalOp } from "./enums/EnumRelational";
    import { ArithmeticOp } from "./enums/EnumArithmetic";
    import { LogicalOp } from "./enums/EnumLogical";

    import { Terminal } from "./expressions/Terminal";
    import { Relational } from "./expressions/Relational";
    import { Arithmetic } from "./expressions/Arithmetic";
    import { Logical } from "./expressions/Logical";
    import { Negative } from "./expressions/Negative";
    import { Not } from "./expressions/Not";
    import { Ternary } from "./expressions/Ternary";
    import { Increment } from "./expressions/Increment";
    import { Decrement } from "./expressions/Decrement";
    import { Cast } from "./expressions/Cast";

    let errors: IError[] = [];

    const addError = (error: IError) => {
        if (error.type === EnumError.LEXICAL_ERROR) {
            error.message = `Caracter: " ${error.message} ", no reconocido como parte del lenguaje`;
        } else if (error.type === EnumError.SYNTAX_ERROR) {
            error.message = `No se esperaba: " ${error.message} ", como parte del lenguaje`;
        }
        console.error(error);
        errors.push(error);
    };
%}

%lex
%options case-insensitive

%%
\s+ // ignore whitespaces
"//".* // ignore comments
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // ignore comments

// terminals
[0-9]+("."[0-9]+)\b return 'DECIMAL';
[0-9]+\b return 'INTEGER';
True|False return 'LOGICAL';
\"((\\\")|[\\n]|[\\\\]|[^\"])*\" {yytext=yytext.substr(1,yyleng-2); return 'STRING';}
\'((\\\')|[\\n]|[\\\\]|[^\'])?\' {yytext=yytext.substr(1,yyleng-2); return 'CHAR';}


// increment and decrement
'++' return 'INCREMENT';
'--' return 'DECREMENT';

// arithmetic operators
'+' return 'ADD';
'-' return 'MINUS';
'*' return 'PRODUCT';
'/' return 'DIVISION';
'%' return 'MODULE';
'^' return 'POWER';

// relational operators
'==' return 'EQUAL';
'!=' return 'NOT_EQUAL';
'<=' return 'LESS_EQUAL';
'>=' return 'GREATER_EQUAL';
'<' return 'LESS';
'>' return 'GREATER';

// ternary operators
'?' return 'TERNARY_IF';
':' return 'TERNARY_ELSE';

// logical operators
'&&' return 'AND';
'||' return 'OR';
'!' return 'NOT';

// grouping operators
'(' return 'OPEN_PARENTHESIS';
')' return 'CLOSE_PARENTHESIS';

// encapsulation operators
'{' return 'OPEN_BRACE';
'}' return 'CLOSE_BRACE';

// array operators
'[' return 'OPEN_BRACKET';
']' return 'CLOSE_BRACKET';

// end sentence operator
';' return 'END_SENTENCE';

// comma
',' return 'COMMA';

// assignment
'=' return 'ASSIGNMENT';

// type
"Int" return 'TYPE';
"Double" return 'TYPE';
"Boolean" return 'TYPE';
"Char" return 'TYPE';
"String" return 'TYPE';

// reserved words
'new' return 'NEW';
'if' return 'IF';
'else' return 'ELSE';
'elif' return 'ELIF';
'switch' return 'SWITCH';
'case' return 'CASE';
'break' return 'BREAK';
'default' return 'DEFAULT';
'continue' return 'CONTINUE';
'while' return 'WHILE';
'for' return 'FOR';
'do' return 'DO';
'until' return 'UNTIL';
'return' return 'RETURN';
'void' return 'VOID';
'print' return 'PRINT';
'println' return 'PRINTLN';

// identifiers
[0-9a-zA-Z_]+ return 'IDENTIFIER';

<<EOF>> return 'EOF'; // end of file
. { addError({type: EnumError.LEXICAL_ERROR, message: yytext, line: yylloc.first_line,
column: yylloc.first_column}); } // invalid token

/lex

// define precedence and associativity
%right 'TERNARY_IF', 'TERNARY_ELSE'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'LESS' 'GREATER' 'LESS_EQUAL' 'GREATER_EQUAL' 'EQUAL' 'NOT_EQUAL'
%left 'ADD', 'MINUS'
%left 'PRODUCT', 'DIVISION'
%left 'MODULE', 'POWER'
%left 'OPEN_PARENTHESIS', 'CLOSE_PARENTHESIS'
%start ini

%%

ini: main_statements EOF { return $1; };

// main statements
main_statements: main_statements main_statement { $1.push($2); $$ = $1; }
    | main_statement { $$ = new Array<IStatement>(); $$[0] = $1; };

// main statement
main_statement: standard_statement { $$ = $1; }
    // | funcion { $$ = $1; }
    // | method { $$ = $1; }
    ;

// standard statements
standard_statements: standard_statements standard_statement { $1.push($2); $$ = $1; }
    | standard_statement { $$ = new Array<IStatement>(); $$[0] = $1; };

// standard statement
standard_statement: declaration END_SENTENCE { $$ = $1; }
    | assign END_SENTENCE { $$ = $1; }
    | print_st END_SENTENCE { $$ = $1; }
    | println_st END_SENTENCE { $$ = $1; }
    | if { $$ = $1; }
    | while { $$ = $1; };

// expression
expr: arithmetic { $$ = $1; }
    | relational { $$ = $1; }
    | logical { $$ = $1; }
    | ternary { $$ = $1; }
    | group { $$ = $1; }
    | value { $$ = $1; }
    | cast { $$ = $1; }
    | increment { $$ = $1; }
    | decrement { $$ = $1; };

// relational expression
relational: expr LESS expr { $$ = new Relational($1, RelationalOp.LESS_THAN, $3); }
    | expr GREATER expr { $$ = new Relational($1, RelationalOp.GREATER_THAN, $3); }
    | expr LESS_EQUAL expr { $$ = new Relational($1, RelationalOp.LESS_THAN_EQUAL, $3); }
    | expr GREATER_EQUAL expr { $$ = new Relational($1, RelationalOp.GREATER_THAN_EQUAL, $3); }
    | expr EQUAL expr { $$ = new Relational($1, RelationalOp.EQUAL, $3); }
    | expr NOT_EQUAL expr { $$ = new Relational($1, RelationalOp.NOT_EQUAL, $3); };

// arithmetic operators
arithmetic: expr ADD expr { $$ = new Arithmetic($1, ArithmeticOp.ADD, $3); }
    | expr MINUS expr { $$ = new Arithmetic($1, ArithmeticOp.MINUS, $3); }
    | expr PRODUCT expr { $$ = new Arithmetic($1, ArithmeticOp.PRODUCT, $3); }
    | expr DIVISION expr { $$ = new Arithmetic($1, ArithmeticOp.DIVISION, $3); }
    | expr MODULE expr { $$ = new Arithmetic($1, ArithmeticOp.MODULE, $3); }
    | expr POWER expr { $$ = new Arithmetic($1, ArithmeticOp.POWER, $3); }
    | MINUS expr %prec 'MINUS' {$$ = new Negative($2); };

// logical operators
logical: expr AND expr { $$ = new Logical($1, LogicalOp.AND, $3); }
    | expr OR expr { $$ = new Logical($1, LogicalOp.OR, $3); }
    | NOT expr { $$ = new Not($2); };

// values
value: DECIMAL { $$ = new Terminal(Terminals.DECIMAL, Number($1)); }
    | INTEGER { $$ = new Terminal(Terminals.INTEGER, Number($1)); }
    | LOGICAL { $$ = new Terminal(Terminals.LOGICAL, fnParseBoolean($1)); }
    | STRING { $$ = new Terminal(Terminals.STRING, $1); }
    | CHAR { $$ = new Terminal(Terminals.CHAR, $1); }
    | IDENTIFIER { $$ = new Terminal(Terminals.ID, $1); };

// ternary operator
ternary: expr TERNARY_IF expr TERNARY_ELSE expr { $$ = new Ternary($1, $3, $5); };

// group of expressions
group: OPEN_PARENTHESIS expr CLOSE_PARENTHESIS { $$ = $2; };

// cast
cast: OPEN_PARENTHESIS TYPE CLOSE_PARENTHESIS expr { $$ = new Cast(fnParseDatatype($2), $4); };

// increment
increment: IDENTIFIER INCREMENT { $$ = new Increment($1); };

// decrement
decrement: IDENTIFIER DECREMENT { $$ = new Decrement($1); };

// list of identifiers
list_identifiers: list_identifiers COMMA IDENTIFIER { $1.push($3); $$ = $1; }
    | IDENTIFIER { $$ = [$1]; };

// declaration
declaration: TYPE list_identifiers { $$ = new Declaration(fnParseDatatype($1), $2); }
    | TYPE list_identifiers ASSIGNMENT expr { $$ = new Declaration(fnParseDatatype($1), $2, $4); };

// assign
assign: list_identifiers ASSIGNMENT expr { $$ = new Assign($1, $3); };

// print
print_st: PRINT OPEN_PARENTHESIS expr CLOSE_PARENTHESIS { $$ = new Print($3); };

// println
println_st: PRINTLN OPEN_PARENTHESIS expr CLOSE_PARENTHESIS { $$ = new Println($3); };

// if-elif-else
if: IF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE { $$ = new If($3, $6); }
    | IF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE ELSE OPEN_BRACE standard_statements CLOSE_BRACE { $$ = new If($3, $6, undefined, $10); }
    | IF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE elifs { $$ = new If($3, $6, $8); }
    | IF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE elifs ELSE OPEN_BRACE standard_statements CLOSE_BRACE { $$ = new If($3, $6, $8, $11); };

// elifs
elifs: elifs ELIF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE { $1.push(new Elif($4, $7)); $$ = $1; }
    | ELIF OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE { $$ = new Array<Elif>(); $$[0] = new Elif($3, $6); };

// loop statements
loop_statements: loop_statements loop_statement { $1.push($2); $$ = $1; }
    | loop_statement { $$ = new Array<IStatement>(); $$[0] = $1; };

// loop statement
loop_statement: standard_statement { $$ = $1; }
    | BREAK END_SENTENCE { $$ = new BreakLoop(); }
    | CONTINUE END_SENTENCE { $$ = new ContinueLoop(); };

// while loop
while: WHILE OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE loop_statements CLOSE_BRACE { $$ = new While($3, $6); };

// do-while loop
do_while: DO OPEN_BRACE loop_statements CLOSE_BRACE WHILE OPEN_PARENTHESIS expr CLOSE_PARENTHESIS END_SENTENCE ;

// do-until loop
do_until: DO OPEN_BRACE loop_statements CLOSE_BRACE UNTIL OPEN_PARENTHESIS expr CLOSE_PARENTHESIS END_SENTENCE ;

// // function statements
// function_statements: function_statements function_statement { $1.push($2); $$ = $1; }
//     | function_statement { $$ = new Array<IStatement>(); $$[0] = $1; };

// // function statement
// function_statement: standard_statement { $$ = $1; }
//     | return expr END_SENTENCE;



// // access array 1
// access_array_1: IDENTIFIER OPEN_BRACKET expr CLOSE_BRACKET;

// // access array 2
// access_array_2: IDENTIFIER OPEN_BRACKET expr CLOSE_BRACKET OPEN_BRACKET expr CLOSE_BRACKET ;

// // declaration array one dimension
// declaration_array_1: TYPE OPEN_BRACKET CLOSE_BRACKET IDENTIFIER ASSIGNMENT NEW TYPE OPEN_BRACKET expr CLOSE_BRACKET ;

// // declaration array two dimension
// declaration_array_2: TYPE OPEN_BRACKET CLOSE_BRACKET OPEN_BRACKET CLOSE_BRACKET IDENTIFIER ASSIGNMENT NEW TYPE OPEN_BRACKET expr CLOSE_BRACKET OPEN_BRACKET expr CLOSE_BRACKET ;

// // assign array one dimension
// assign_array_1: TYPE OPEN_BRACKET CLOSE_BRACKET IDENTIFIER ASSIGNMENT group_expr ;

// // assign array two dimension
// assign_array_2: TYPE OPEN_BRACKET CLOSE_BRACKET OPEN_BRACKET CLOSE_BRACKET IDENTIFIER ASSIGNMENT OPEN_BRACE list_group CLOSE_BRACE ;

// // group of expressions
// group_expr: OPEN_BRACE list_expr CLOSE_BRACE ;

// // list of group of expressions
// list_group: list_group COMMA group_expr
//     | group_expr ;

// // list of expressions
// list_expr: list_expr COMMA expr
//     | expr ;

// // switch-case
// switch: SWITCH OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE cases CLOSE_BRACE 
//     | SWITCH OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE cases DEFAULT TERNARY_IF cases CLOSE_BRACE 
//     | SWITCH OPEN_PARENTHESIS expr CLOSE_PARENTHESIS OPEN_BRACE DEFAULT TERNARY_IF cases CLOSE_BRACE ;

// cases: cases CASE expr TERNARY_IF switch_statements 
//     | CASE expr TERNARY_IF switch_statements ;

// switch_statements: standard_statements 
//     | BREAK END_SENTENCE ;


// // for loop
// for: FOR OPEN_PARENTHESIS expr END_SENTENCE expr END_SENTENCE expr CLOSE_PARENTHESIS OPEN_BRACE loop_statements CLOSE_BRACE ;

// // parameters
// parameters: parameters COMMA IDENTIFIER
//     | IDENTIFIER ;

// // function
// funcion: TYPE IDENTIFIER OPEN_PARENTHESIS parameters CLOSE_PARENTHESIS TERNARY_ELSE TYPE OPEN_BRACE function_statements CLOSE_BRACE ;

// // method
// method: TYPE IDENTIFIER OPEN_PARENTHESIS parameters CLOSE_PARENTHESIS TERNARY_ELSE VOID OPEN_BRACE standard_statements CLOSE_BRACE 
//     | TYPE IDENTIFIER OPEN_PARENTHESIS parameters CLOSE_PARENTHESIS OPEN_BRACE standard_statements CLOSE_BRACE ;

// // arguments
// arguments: arguments COMMA expr
//     | expr ;

// // call
// call: IDENTIFIER OPEN_PARENTHESIS arguments CLOSE_PARENTHESIS 
//     | IDENTIFIER OPEN_PARENTHESIS CLOSE_PARENTHESIS ;