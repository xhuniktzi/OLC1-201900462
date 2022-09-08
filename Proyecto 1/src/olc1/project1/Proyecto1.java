/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package olc1.project1;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import olc1.project1.analizadores.Lexico;
import olc1.project1.analizadores.Sintactico;
import olc1.project1.instructions.EnumOperations;
import olc1.project1.instructions.EnumTerminals;
import olc1.project1.instructions.EnumTypes;
import olc1.project1.instructions.EnumUnitaryOperations;
import olc1.project1.instructions.Statement;

/**
 *
 * @author Xhunik
 */
public class Proyecto1 {

    /**
     * @param args the command line arguments
     * @throws java.io.FileNotFoundException
     */
    public static void main(String[] args) throws FileNotFoundException, IOException, Exception {
        String path = "./Copia de archivoEntrada.olc";
        // TODO code application logic here
        Lexico scanner = new Lexico(new FileReader(new File(path)));
        Sintactico parser = new Sintactico(scanner);
        parser.parse();
        
        LinkedList<Statement> ast = parser.AST;
        
//        String pyStr = translatePython(ast);
//        System.out.println(pyStr);
//        
        String graph = graph(ast);
        System.out.println(graph);
    }
    
    public static String translatePython(LinkedList<Statement> ast){
        StringBuilder str = new StringBuilder();
        str.append("def main():\n");
        
        for (Statement statement : ast) {
            str.append(pythonAddTabs(statement.translatePython())).append("\n");
        }
        str.append("if __name__ == '__main__':\n");
        str.append("\tmain()");
        return str.toString();
    }
    
    public static String graph(LinkedList<Statement> ast){
        StringBuilder str = new StringBuilder();
        
        str.append("digraph G {\n");
        str.append("rootNode [label=\"Raiz\"];\n");
        str.append("node[shape=\"rectangle\"];\n");
        
        for (Statement statement : ast) {
            // @TODO: delete in production
            String className = statement.getClass().getSimpleName();
            if (checkIfClassIsModeled(className)){
                
                str.append("rootNode ->").append("T_").append(statement.getGuid()).append(";\n");
                str.append(statement.traverse());
            }             
        }
        
        str.append("}");
        
        return str.toString();
    }
    
    // @TODO: delete in production
    public static boolean checkIfClassIsModeled(String className){ 
        return className.equals("Assignment") || className.equals("Execute")|| className.equals("Declaration")
                    || className.equals("Print") || className.equals("Println") || className.equals("While")
                || className.equals("Procedure") || className.equals("Param") || className.equals("Function")
                || className.equals("Return") || className.equals("Repeat");
    }
    
    public static String pythonTerminals(String value, EnumTerminals type){
        switch (type) {
            case BOOLEAN -> {
                if ("verdadero".equals(value)) return "True";
                else if ("falso".equals(value)) return "False";
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
    
    public static EnumTypes checkTypes(String type){
        type = type.toLowerCase();
         switch (type) {
            case "numero" -> {
                return EnumTypes.NUM;
            }
            case "cadena" -> {
                return EnumTypes.STR;
            }
            case "boolean" -> {
                return EnumTypes.BOOLEAN;
            }
            case "caracter" -> {
                return EnumTypes.CHAR;
            }
            default -> throw new AssertionError();
        }
    }
    
    public static String viewTypes(EnumTypes type){
        switch (type) {
            case BOOLEAN -> {
                return "bool";
            }
            case CHAR -> {
                return "str";
            }
            case NUM -> {
                return "float";
            }
            case STR -> {
                return "str";
            }
            default -> throw new AssertionError();
        }
    }
    
    public static String generateGuid(){
        return UUID.randomUUID().toString().replaceAll("-", "").replaceFirst("[0-9]+", "");
    }
    
    public static String pythonSymbolBinaryOperators(EnumOperations op){
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
    
    public static String pythonSymbolUnitaryOperators(EnumUnitaryOperations op){
        switch (op){
            case NEGATIVE -> {
                return "-";
            }
            case NOT -> {
                return "not";
            }
            default -> throw new AssertionError();
        }
    }
    
    public static String pythonAddTabs(String input){
        StringBuilder str = new StringBuilder();
        
        List<String> lines = input.lines().toList();
        
        for (String line : lines) {
            str.append("\t").append(line).append("\n");

        }
        
        return str.toString();
    }
}
