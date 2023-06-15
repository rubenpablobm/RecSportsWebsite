/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;


// page_url = http://localhost:4200/

public class EdificioCrud {
    @FindBy(css = "input[id='exampleInputEmail1']")
    public WebElement inputExampleEmail;
    @FindBy(css = "input[id='exampleInputPassword1']")
    public WebElement inputExamplePassword;
    @FindBy(css = "button[class$='btn-primary']")
    public WebElement buttonSubmit;
    @FindBy(css = "button[routerlink='/edificio-tabla/tabla']")
    public WebElement buttonEdificios;
    @FindBy(css = "button[class*='btn-success']")
    public WebElement buttonAgregarTabla;
    @FindBy(css = "input[formcontrolname='Nombre']")
    public WebElement inputNombre;
    @FindBy(css = "input[formcontrolname='Foto']")
    public WebElement inputFoto;
    @FindBy(css = "input[formcontrolname='LinkMaps']")
    public WebElement inputLinkMaps;
    @FindBy(css = "button[class*='btn-success']")
    public WebElement buttonAgregarEdificio;
    @FindBy(css = "button[class*='btn-danger']")
    public WebElement buttonCancelarAgregarEdificio;
    @FindBy(css = "button[class*='btn-primary']")
    public WebElement buttonGuardarEdificio;
    @FindBy(css = "button[class*='btn-danger']")
    public WebElement buttonCancelarEditarEdificio;
    public EdificioCrud(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
