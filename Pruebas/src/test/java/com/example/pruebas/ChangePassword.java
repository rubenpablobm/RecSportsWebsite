/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Jesús Sebastián Jaime Oviedo
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
package com.example.pruebas;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ChangePassword {
    @FindBy(css = "input[formcontrolname='Email']")
    public WebElement inputEmail;
    @FindBy(css = "input[formcontrolname='Contrasena']")
    public WebElement inputContrasena;
    @FindBy(css = "input[formcontrolname='RepContrasena']")
    public WebElement inputRepContrasena;
    @FindBy(css = "button[type='submit']")
    public WebElement botonCambiarContra;
    
    public WebElement contenedorAccesoLibre;
    public AreaInfo(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }

}
