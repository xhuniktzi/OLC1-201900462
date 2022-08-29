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
public class For implements Statement {
    Operation expr1;
    Operation expr2;
    int incremental;
    LinkedList<Statement> statements;
    
    public For(Operation  expr1, Operation expr2, LinkedList<Statement> statements){
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = 1;
        this.statements = statements;
    }
    
    public For(Operation  expr1, Operation expr2, String incremental, LinkedList<Statement> statements){
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = Integer.parseInt(incremental);
        this.statements = statements;
    }
    
    public For(Operation  expr1, Operation expr2){
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = 1;
    }
    
    public For(Operation  expr1, Operation expr2, String incremental){
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = Integer.parseInt(incremental);
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
