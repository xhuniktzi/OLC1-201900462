/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import java.util.Iterator;
import java.util.LinkedList;
import olc1.project1.Proyecto1;

/**
 *
 * @author Xhunik
 */
public class Procedure implements Statement {
    private final String guid = Proyecto1.generateGuid();
    @Override
    public String getGuid() { return this.guid; }
    
    String funcId;
    LinkedList<Param> params_list;
    LinkedList<Statement> statements;
    
    public Procedure(String funcId, LinkedList<Statement> statements){
        this.funcId = funcId;
        this.statements = statements;
    }
    
    public Procedure(String funcId, LinkedList<Param> params_list, LinkedList<Statement> statements){
        this.funcId = funcId;
        this.params_list = params_list;
        this.statements = statements;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython(){
        StringBuilder str = new StringBuilder();
        
        str.append("def ").append(funcId).append("(");
        
        if (params_list != null){
            Iterator<Param> iterator = params_list.iterator();

            while (iterator.hasNext()){
                String args = iterator.next().translatePython();
                str.append(args);
                if (iterator.hasNext()){
                    str.append(",");
                }
            }
        }
        
        str.append("):\n");
        
        for (Statement statement : statements) {
            str.append(Proyecto1.pythonAddTabs(statement.translatePython())).append("\n");
        }
        
        return str.toString();
    }
}
