/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package olc1.project1.errors;

/**
 *
 * @author Xhunik
 */
public class SintaxError {
    public String lexema;
    public int row;
    public int col;
    public boolean recuperable;
    
    public SintaxError(String lexema, int row, int col, boolean recuperable){
        this.lexema = lexema;
        this.row = row;
        this.col = col;
        this.recuperable = recuperable;
    }
}
