/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AdminSignin {

    @FindBy(css = "h1[class='ini']")
    public WebElement h1IniciarSesion;
    @FindBy(css = "input[id='exampleInputEmail1']")
    public WebElement inputEmail;

    @FindBy(css = "input[id='exampleInputPassword1']")
    public WebElement inputPassword;

    @FindBy(css = "button[class$='btn-primary']")
    public WebElement buttonCambioContraseña;

    @FindBy(css = "button[class$='btn-primary']")
    public WebElement buttonSubmit;
    @FindBy(css = "html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")
    public WebElement divUsuarioExistente;
    public AdminSignin(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
    
    
    
}
