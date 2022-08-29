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
public class Repeat implements Statement {
    LinkedList<Statement> statements;
    Operation expr;
    
    public Repeat(LinkedList<Statement> statements, Operation expr){
        this.statements = statements;
        this.expr = expr;
    }
    
    public Repeat(Operation expr){
        this.expr = expr;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    // @TODO: fix in production to convert do while statement
    public String translatePython(){
        StringBuilder str = new StringBuilder();
        
        str.append("while ").append(expr.translatePython()).append(":\n");
        for (Statement statement : statements) {
            str.append(Proyecto1.pythonAddTabs(statement.translatePython())).append("\n");
        }
        
        return str.toString();
    }
}
