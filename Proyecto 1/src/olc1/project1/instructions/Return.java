/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

/**
 *
 * @author Xhunik
 */
public class Return implements Statement {
    Operation expr;
    
    public Return(Operation expr){
        this.expr = expr;
    }
}
