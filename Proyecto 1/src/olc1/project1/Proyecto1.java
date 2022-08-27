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
import olc1.project1.analizadores.Lexico;
import olc1.project1.analizadores.Sintactico;
import olc1.project1.instructions.EnumTypes;
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
        String path = "./Entrada.txt";
        // TODO code application logic here
        Lexico scanner = new Lexico(new FileReader(new File(path)));
        Sintactico parser = new Sintactico(scanner);
        parser.parse();
        
        LinkedList<Statement> ast = parser.AST;
    }
    
    public static EnumTypes checkTypes(String type){
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
}
