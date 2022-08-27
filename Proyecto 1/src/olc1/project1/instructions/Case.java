/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import java.util.LinkedList;
import olc1.project1.instructions.Operation;
import olc1.project1.instructions.Statement;

/**
 *
 * @author Xhunik
 */
public class Case implements Statement {
    Operation expr;
    LinkedList<Statement> statements;
    
    public Case(Operation expr, LinkedList<Statement> statements){
        this.expr = expr;
        this.statements = statements;
    }
}
