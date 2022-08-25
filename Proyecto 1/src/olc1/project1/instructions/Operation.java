/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

/**
 *
 * @author Xhunik
 */
public class Operation implements Statement {
    // Binary operations
    Operation left;
    Operation right;
    EnumOperations type;
        
    // Unitary operations;
    Operation op;
    EnumUnitaryOperations typeUnitary;
    
    // Terminal expresions
    String value;
    EnumTerminals typeTerminal;

    public Operation(Operation left, EnumOperations type, Operation right){
        this.left = left;
        this.right = right;
        this.type = type;
    }
    
    public Operation(Operation op, EnumUnitaryOperations typeUnitary){
        this.op = op;
        this.typeUnitary = typeUnitary;
    }
    
    public Operation(String value, EnumTerminals typeTerminal){
        this.value = value;
        this.typeTerminal = typeTerminal;
    }
}
