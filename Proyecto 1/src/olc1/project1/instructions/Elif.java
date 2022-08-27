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
public class Elif implements Statement {
    Operation expr;
    LinkedList<Statement> statements;
    
    public Elif(Operation expr, LinkedList<Statement> statements){
        this.expr = expr;
        this.statements = statements;
    }
}
