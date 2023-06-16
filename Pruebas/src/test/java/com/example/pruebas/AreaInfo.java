/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AreaInfo {
    @FindBy(css = "a[data-bs-toggle='dropdown']")
    public WebElement botonEdificios;
    @FindBy(css = "ul[data-bs-popper='static']")
    public WebElement dropdownEdificios;
    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Aforo']")
    public WebElement contenedorAforo;
    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Instructiva']")
    public WebElement contenedorInstructivas;
    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Reservacion']")
    public WebElement contenedorAccesoLibre;
    @FindBy(css = "input[id='exampleInputEmail1']")
    public WebElement inputExampleEmail;

    @FindBy(css = "input[id='exampleInputPassword1']")
    public WebElement inputExamplePassword;

    @FindBy(css = "button[class$='btn-primary']")
    public WebElement buttonSubmit;
    public AreaInfo(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
