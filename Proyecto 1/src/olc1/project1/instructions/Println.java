/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import olc1.project1.Proyecto1;

/**
 *
 * @author Xhunik
 */
public class Println implements Statement {
    private final String guid = Proyecto1.generateGuid();
    @Override
    public String getGuid() { return this.guid; }
    
    Operation expr;
    
    public Println(Operation expr){
        this.expr = expr;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython() {
        StringBuilder str = new StringBuilder();
        
        str.append("print(").append(expr.translatePython()).append(")");
        
        return str.toString();
    }
}
