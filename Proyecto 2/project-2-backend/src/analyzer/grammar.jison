%{
    import { IError } from './exceptions/IError';
    import { EnumError } from './exceptions/EnumError';

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

// arithmetic operators
'+' return 'ADD';
'-' return 'MINUS';
'*' return 'PRODUCT';
'/' return 'DIVISION';
'%' return 'MODULE';
'^' return 'POWER';

// relational operators
'<' return 'LESS';
'>' return 'GREATER';
'<=' return 'LESS_EQUAL';
'>=' return 'GREATER_EQUAL';
'==' return 'EQUAL';
'!=' return 'NOT_EQUAL';

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

// end sentence operator
';' return 'END_SENTENCE';

// assignment
'=' return 'ASSIGNMENT';

// comma
',' return 'COMMA';

// type
"Int" return 'TYPE';
"Double" return 'TYPE';
"Boolean" return 'TYPE';
"Char" return 'TYPE';
"String" return 'TYPE';

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
%start ini

%%

ini: standard_statements EOF { return $1; };

// standard statements
standard_statements: standard_statements standard_statement { $1.push($2); $$ = $1; }
    | standard_statement { $$ = [$1]; };

// standard statement
standard_statement: declaration END_SENTENCE { $$ = $1; }
    | assignment END_SENTENCE { $$ = $1; }
    | error { addError({type: EnumError.SYNTAX_ERROR, message: yytext, line: this.$.first_line,
    column: this.$.first_column}); };

// declaration
declaration: TYPE list_identifiers { $$ = [$1, $2]; }
    | TYPE list_identifiers ASSIGNMENT expr { $$ = [$1, $2, $3, $4]; };

// assign statement
assign: list_identifiers ASSIGNMENT expr { $$ = [$1, $2, $3]; };

// list of identifiers
list_identifiers: list_identifiers COMMA IDENTIFIER { $1.push($3); $$ = $1; }
    | IDENTIFIER { $$ = [$1]; };

// expression
expr: aritmetic { $$ = $1; }
    | relational { $$ = $1; }
    | logical { $$ = $1; }
    | ternary { $$ = $1; }
    | group { $$ = $1; }
    | value { $$ = $1; }
    | error { addError({type: EnumError.SYNTAX_ERROR, message: yytext, line: this.$.first_line,
    column: this.$.first_column}); };

// relational expression
relational: expr LESS expr { $$ = [$1, $2, $3]; }
    | expr GREATER expr { $$ = [$1, $2, $3]; }
    | expr LESS_EQUAL expr { $$ = [$1, $2, $3]; }
    | expr GREATER_EQUAL expr { $$ = [$1, $2, $3]; }
    | expr EQUAL expr { $$ = [$1, $2, $3]; }
    | expr NOT_EQUAL expr { $$ = [$1, $2, $3]; };

// aritmetic operators
aritmetic: expr ADD expr { $$ = [$1, $2, $3]; }
    | expr MINUS expr { $$ = [$1, $2, $3]; }
    | expr PRODUCT expr { $$ = [$1, $2, $3]; }
    | expr DIVISION expr { $$ = [$1, $2, $3]; }
    | MINUS expr %prec 'MINUS' { $$ = [$1, $2]; };

// logical operators
logical: expr AND expr { $$ = [$1, $2, $3]; }
    | expr OR expr { $$ = [$1, $2, $3]; }
    | NOT expr { $$ = [$1, $2]; };

// ternary operator
ternary: expr TERNARY_IF expr TERNARY_ELSE expr { $$ = [$1, $2, $3, $4, $5]; };

// group of expressions
group: OPEN_PARENTHESIS expr CLOSE_PARENTHESIS { $$ = [$1, $2, $3]; };

// values
value: DECIMAL { $$ = $1; }
    | INTEGER { $$ = $1; }
    | LOGICAL { $$ = $1; }
    | STRING { $$ = $1; }
    | CHAR { $$ = $1; };