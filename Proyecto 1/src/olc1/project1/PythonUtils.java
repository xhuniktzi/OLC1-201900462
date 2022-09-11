/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1;

import java.util.List;
import olc1.project1.instructions.EnumOperations;
import olc1.project1.instructions.EnumTerminals;
import olc1.project1.instructions.EnumUnitaryOperations;

/**
 *
 * @author Xhunik
 */
public class PythonUtils {

    /**
     *
     * @param input the value of input
     * @return 
     */
    public static String pythonAddTabs(String input) {
        StringBuilder str = new StringBuilder();
        List<String> lines = input.lines().toList();
        for (String line : lines) {
            str.append("\t").append(line).append("\n");
        }
        return str.toString();
    }

    /**
     *
     * @param op the value of op
     * @return 
     */
    public static String pythonSymbolBinaryOperators(EnumOperations op) {
        switch (op) {
            case ADD -> {
                return "+";
            }
            case AND -> {
                return "and";
            }
            case DIVISION -> {
                return "/";
            }
            case EQUALS -> {
                return "==";
            }
            case MAJOR -> {
                return ">";
            }
            case MAJOREQUALS -> {
                return ">=";
            }
            case MINOR -> {
                return "<";
            }
            case MINOREQUALS -> {
                return "<=";
            }
            case MODULE -> {
                return "%";
            }
            case MULTIPLY -> {
                return "*";
            }
            case NOTEQUALS -> {
                return "!=";
            }
            case OR -> {
                return "or";
            }
            case POW -> {
                return "**";
            }
            case SUBSTRACT -> {
                return "-";
            }
            default -> throw new AssertionError();
        }
    }

    /**
     *
     * @param value the value of value
     * @param type the value of type
     * @return 
     */
    public static String pythonTerminals(String value, EnumTerminals type) {
        switch (type) {
            case BOOLEAN -> {
                if ("verdadero".equals(value)) {
                    return "True";
                } else if ("falso".equals(value)) {
                    return "False";
                }
            }
            case CHAR -> {
                return "'" + value + "'";
            }
            case ID -> {
                return value;
            }
            case NUM -> {
                return value;
            }
            case STR -> {
                return "\"" + value + "\"";
            }
            default -> throw new AssertionError();
        }
        return null;
    }

    /**
     *
     * @param op the value of op
     * @return 
     */
    public static String pythonSymbolUnitaryOperators(EnumUnitaryOperations op) {
        switch (op) {
            case NEGATIVE -> {
                return "-";
            }
            case NOT -> {
                return "not";
            }
            default -> throw new AssertionError();
        }
    }
    
}
