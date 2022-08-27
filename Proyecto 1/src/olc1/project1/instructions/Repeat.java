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
public class Repeat implements Statement {
    LinkedList<Statement> statements;
    Operation expr;
    
    public Repeat(LinkedList<Statement> statements, Operation expr){
        this.statements = statements;
        this.expr = expr;
    }
    
    public Repeat(Operation expr){
        this.expr = expr;
    }
}
