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
public class Procedure implements Statement {
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
}
