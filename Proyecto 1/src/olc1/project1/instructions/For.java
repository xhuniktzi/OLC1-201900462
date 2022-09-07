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
public class For implements Statement {
    private final String guid = Proyecto1.generateGuid();
    @Override
    public String getGuid() { return this.guid; }
    
    String varId;
    Operation expr1;
    Operation expr2;
    int incremental;
    LinkedList<Statement> statements;
    
    public For(String varId, Operation expr1, Operation expr2, LinkedList<Statement> statements){
        this.varId = varId;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = 1;
        this.statements = statements;
    }
    
    public For(String varId, Operation  expr1, Operation expr2, String incremental, LinkedList<Statement> statements){
        this.varId = varId;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = Integer.parseInt(incremental);
        this.statements = statements;
    }
    
    public For(String varId, Operation  expr1, Operation expr2){
        this.varId = varId;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.incremental = 1;
    }
    
    public For(String varId, Operation  expr1, Operation expr2, String incremental){
        this.varId = varId;
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
        StringBuilder str = new StringBuilder();
        
        str.append("for ").append(varId).append(" in range(").append(expr1.translatePython())
                .append(",").append(expr2.translatePython());
        
                if (incremental != 0)
                    str.append(",").append(incremental);
                
                str.append("):\n");
        
        for (Statement statement : statements) {
            str.append(Proyecto1.pythonAddTabs(statement.translatePython())).append("\n");
        }
        
        return str.toString();
    }
}
