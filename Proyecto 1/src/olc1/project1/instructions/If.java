/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import java.util.LinkedList;
import olc1.project1.Proyecto1;

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
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython(){
        StringBuilder str = new StringBuilder();
        
        str.append("if ").append(expr.translatePython()).append(":\n");
        for (Statement statement : statements) {
            str.append(Proyecto1.pythonAddTabs(statement.translatePython())).append("\n");
        }
        
        if (elifs != null){
        
            for (Elif elif : elifs) {
                str.append(Proyecto1.pythonAddTabs(elif.translatePython())).append("\n");
            }
        
        }
        
        if (else_statements != null){
        
            for (Statement else_statement : else_statements) {
                str.append(Proyecto1.pythonAddTabs(else_statement.translatePython())).append("\n");
            }
            
        }
        
        return str.toString();
    }
}
