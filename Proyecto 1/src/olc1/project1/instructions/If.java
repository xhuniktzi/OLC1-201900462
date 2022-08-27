/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import java.util.LinkedList;

/**
 *
 * @author Xhunik
 */
public class If implements Statement {
    Operation expr;
    LinkedList<Statement> statements;
    LinkedList<Elif> elifs;
    LinkedList<Statement> else_statements;
    
    public If(Operation expr, LinkedList<Statement> statements){
        this.expr = expr;
        this.statements = statements;
    }
    
    public If(Operation expr, LinkedList<Statement> statements, LinkedList<Statement> else_statements){
        this.expr = expr;
        this.statements = statements;
        this.else_statements = else_statements;
    }
    
    public If(Operation expr, LinkedList<Statement> statements, LinkedList<Elif> elifs, LinkedList<Statement> else_statements){
        this.expr = expr;
        this.statements = statements;
        this.elifs = elifs;
        this.else_statements = else_statements;
    }
}
