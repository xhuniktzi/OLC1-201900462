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
public class Switch implements Statement {
    Operation expr;
    LinkedList<Case> cases;
    LinkedList<Statement> else_statements;
    
    public Switch(Operation expr, LinkedList<Case> cases){
        this.expr = expr;
        this.cases = cases;
    }
    
    public Switch(Operation expr, LinkedList<Case> cases, LinkedList<Statement> else_statements){
        this.expr = expr;
        this.cases = cases;
        this.else_statements = else_statements;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython(){
        return null;
    }
}
