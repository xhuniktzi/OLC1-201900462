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
    
    // Flag Type
    private final TypeOperation typeOp;

    public Operation(Operation left, EnumOperations type, Operation right){
        this.left = left;
        this.right = right;
        this.type = type;
        this.typeOp = TypeOperation.BINARY;
    }
    
    public Operation(Operation op, EnumUnitaryOperations typeUnitary){
        this.op = op;
        this.typeUnitary = typeUnitary;
        this.typeOp = TypeOperation.UNITARY;
    }
    
    public Operation(String value, EnumTerminals typeTerminal){
        this.value = value;
        this.typeTerminal = typeTerminal;
        this.typeOp = TypeOperation.TERMINAL;
    }
    
    public Operation(Operation value){
        this.value = value.translatePython();
        this.typeOp = TypeOperation.GROUP;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        return str.toString();
    }
    
    @Override
    public String translatePython() {
        StringBuilder str = new StringBuilder();
        
        switch (typeOp) {
            case BINARY -> {
                str.append(left.translatePython()).append(" ")
                        .append(Proyecto1.pythonSymbolBinaryOperators(type)).append(" ")
                        .append(right.translatePython());
            }
            case UNITARY -> {
                str.append(Proyecto1.pythonSymbolUnitaryOperators(typeUnitary)).append(" ").append(op.translatePython());
            }
            case TERMINAL -> {
                str.append(Proyecto1.pythonTerminals(value, typeTerminal));
            }
            case GROUP -> {
                str.append("(").append(value).append(")");
            }
            default -> throw new AssertionError();
        }
        
        return str.toString();
    }
}
