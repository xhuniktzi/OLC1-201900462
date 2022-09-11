/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.instructions;

import olc1.project1.Proyecto1;
import olc1.project1.PythonUtils;

/**
 *
 * @author Xhunik
 */
public class Operation implements Statement {
    private final String guid = Proyecto1.generateGuid();
    @Override
    public String getGuid() { return this.guid; }
    
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
    
    // Function expresion
    Execute function;
    
    // Group
    Operation opGroup;
    
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
        this.opGroup = value;
        this.typeOp = TypeOperation.GROUP;
    }
    
    public Operation(Execute value){
        this.function = value;
        this.typeOp = TypeOperation.FUNCTION;
    }
    
    @Override
    public String traverse() {
        StringBuilder str = new StringBuilder();
        
        // root of expresion
        str.append("T_").append(guid).append("[label=\"T_Operation\"];\n");
        
        switch (typeOp) {
            case BINARY -> {
                // root of this to root of left
                str.append("T_").append(guid).append("->").append("T_").append(left.guid)
                         .append(";\n");
                
                // left expresion
                str.append(left.traverse());
                
                // operator
               str.append("Op_").append(guid).append("[label=\"")
                        .append(PythonUtils.pythonSymbolBinaryOperators(type)).append("\"];\n");
               
               // root to operator
                str.append("T_").append(guid).append("->").append("Op_").append(guid)
                         .append(";\n");
                
                // root of this to root of right
                str.append("T_").append(guid).append("->").append("T_").append(right.guid)
                         .append(";\n");
                
                // right expresion
                str.append(right.traverse());
            }
            case UNITARY -> {
                // operator
                str.append("Op_").append(guid).append("[label=\"")
                        .append(PythonUtils.pythonSymbolUnitaryOperators(typeUnitary)).append("\"];\n");
                
                // root to operator
                str.append("T_").append(guid).append("->").append("Op_").append(guid)
                         .append(";\n");
                
                // root of this to root of expresion
                str.append("T_").append(guid).append("->").append("T_").append(op.guid)
                         .append(";\n");
                
                //expresion
                str.append(op.traverse());
            }
            case TERMINAL -> {
                // value of expresion
                str.append("Val_").append(guid).append("[label=\"")
                        .append(value).append("\"];\n");
                
                // root of this to value
                str.append("T_").append(guid).append("->").append("Val_").append(guid)
                         .append(";\n");
            }
            case GROUP -> {
                // start token
                str.append("SP_").append(guid).append("[label=\"(\"];\n");
                
                // root to start
                str.append("T_").append(guid).append("->").append("SP_").append(guid)
                         .append(";\n");
                
                // root to group
                str.append("T_").append(guid).append("->").append("T_")
                        .append(opGroup.guid).append(";\n");
                
                // group
                str.append(opGroup.traverse());

                // end token
                str.append("EP_").append(guid).append("[label=\")\"];\n");
                
                // root to end
                str.append("T_").append(guid).append("->").append("EP_").append(guid)
                         .append(";\n");
            }
            case FUNCTION -> {
                // root of this to function
                str.append("T_").append(guid).append("->").append("T_").append(function.getGuid())
                         .append(";\n");
                
                // function
                str.append(function.traverse());
            }
            default -> throw new AssertionError();
        }
        
        return str.toString();
    }
    
    @Override
    public String translatePython() {
        StringBuilder str = new StringBuilder();
        
        switch (typeOp) {
            case BINARY -> {
                str.append(left.translatePython()).append(" ")
                        .append(PythonUtils.pythonSymbolBinaryOperators(type)).append(" ")
                        .append(right.translatePython());
            }
            case UNITARY -> {
                str.append(PythonUtils.pythonSymbolUnitaryOperators(typeUnitary)).append(" ").append(op.translatePython());
            }
            case TERMINAL -> {
                str.append(PythonUtils.pythonTerminals(value, typeTerminal));
            }
            case GROUP -> {
                str.append("(").append(opGroup.translatePython()).append(")");
            }
            case FUNCTION -> {
                str.append(function.translatePython());
            }
            default -> throw new AssertionError();
        }
        
        return str.toString();
    }
}
