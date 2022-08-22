/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package olc1.project1;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java_cup.runtime.Symbol;
import olc1.project1.analizadores.Lexico;
import olc1.project1.analizadores.sym;

/**
 *
 * @author Xhunik
 */
public class Proyecto1 {

    /**
     * @param args the command line arguments
     * @throws java.io.FileNotFoundException
     */
    public static void main(String[] args) throws FileNotFoundException, IOException {
        String path = "./test.txt";
        // TODO code application logic here
        Lexico scanner = new Lexico(new FileReader(new File(path)));
        
       
        Symbol s = scanner.next_token();

        while (s.value != null){
            
            System.out.println("Simbolo: " + s.value + " Token: " + sym.terminalNames[s.sym]);
           
            s = scanner.next_token();
        }
                  
                
           
       
        
        // Sintactico parser = new Sintactico(scanner);
    }
    
}
