/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import java.util.LinkedList;
import olc1.project1.Proyecto1;
import static olc1.project1.Proyecto1.checkIfClassIsModeled;

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
        
        // root to expr
        str.append("T_").append(guid).append("[label=\"T_For\"];\n");
        
        // reserved for
        str.append("R_for_").append(guid).append("[label=\"FOR\"];\n");
        
        // root to reserved
        str.append("T_").append(guid).append("->").append("R_for_")
                .append(guid).append(";\n");
        
        // root to expr1
        str.append("T_").append(guid).append("->")
                .append("T_").append(expr1.getGuid()).append(";\n");
        
        // expr1
        str.append(expr1.traverse());
        
        // root to expr2
        str.append("T_").append(guid).append("->")
                .append("T_").append(expr2.getGuid()).append(";\n");
        
        // expr2
        str.append(expr2.traverse());
        
        // statements
        for (Statement statement : statements) {
            // @TODO: delete in production
            String className = statement.getClass().getSimpleName();
            if (checkIfClassIsModeled(className)){
                // root to statement
                str.append("T_").append(guid).append("->")
                        .append("T_").append(statement.getGuid()).append(";\n");

                // statement
                str.append(statement.traverse());
            }
        }
        
        // reserved end for
        str.append("R_end_for_").append(guid).append("[label=\"END FOR\"];\n");
        
        // root to reserved
        str.append("T_").append(guid).append("->").append("R_end_for_")
                .append(guid).append(";\n");
        
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
