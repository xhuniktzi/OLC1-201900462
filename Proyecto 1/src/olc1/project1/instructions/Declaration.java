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
public class Declaration implements Statement {
    LinkedList<String> name_list;
    EnumTypes type;
    Operation expr;
    
    public Declaration(LinkedList<String> name_list, String type, Operation expr){
        this.name_list = name_list;
        this.type = Proyecto1.checkTypes(type);
        this.expr = expr;
    }
}
