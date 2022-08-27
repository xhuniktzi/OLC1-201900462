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
public class Execute implements Statement {
    String funcId;
    LinkedList<Operation> args_list;
    
    public Execute(String funcId){
        this.funcId = funcId;
    }
    
    public Execute(String funcId, LinkedList<Operation> args_list){
        this.funcId = funcId;
        this.args_list = args_list;
    }
}
