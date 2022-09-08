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
public class Repeat implements Statement {
    private final String guid = Proyecto1.generateGuid();
    @Override
    public String getGuid() { return this.guid; }
    
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
        
        // root of expresion
        str.append("T_").append(guid).append("[label=\"T_Repeat\"];\n");
        
        // reserved word repeat
        str.append("R_repeat_").append(guid).append("[label=\"REPEAT\"];\n");
        
        // root to reserved repeat
        str.append("T_").append(guid).append("->").append("R_repeat_")
                        .append(guid).append(";\n");
        
        // statements
        for (Statement statement : statements) {
            // @TODO: delete in production
            String className = statement.getClass().getSimpleName();
            if (checkIfClassIsModeled(className)){
                
                str.append("T_").append(guid).append("->").append("T_").append(statement.getGuid()).append(";\n");
                str.append(statement.traverse());
            }             
        }
        
        // reserved word end_repeat
        str.append("R_end_repeat_").append(guid).append("[label=\"END REPEAT\"];\n");
        
        // root to reserved end_repeat
        str.append("T_").append(guid).append("->").append("R_end_repeat_")
                        .append(guid).append(";\n");
        
        // root to expresion
        str.append("T_").append(guid).append("->").append("T_").append(expr.getGuid())
                .append(";\n");
        
        // expresion
        str.append(expr.traverse());
        
        return str.toString();
    }
    
    @Override
    public String translatePython(){
        StringBuilder str = new StringBuilder();
        str.append("flag = True\n");
        str.append("repeat ").append("flag").append(":\n");
        for (Statement statement : statements) {
            str.append(Proyecto1.pythonAddTabs(statement.translatePython())).append("\n");
        }
        str.append("\tif ").append(expr.translatePython()).append(":\n");
        str.append("\t\tbreak");
        
        return str.toString();
    }
}
