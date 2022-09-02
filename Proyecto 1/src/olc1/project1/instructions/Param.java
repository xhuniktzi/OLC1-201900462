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
public class Param implements Statement {
    String id;
    EnumTypes type;
    public Param(String id, String type){
        this.id = id;
        this.type = Proyecto1.checkTypes(type);
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython(){
        StringBuilder str = new StringBuilder();
        
        str.append(id);
        
        return str.toString();
    }
}


