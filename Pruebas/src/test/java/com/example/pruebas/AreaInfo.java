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
    @FindBy(id = "nombreArea")
    public WebElement nombreArea;
    @FindBy(id = "horariosArea")
    public WebElement horariosArea;
    @FindBy(id = "descripcionArea")
    public WebElement descripcionArea;
    @FindBy(css = "img[class='croquis']")
    public WebElement imageCroquis;
    @FindBy(css = "iframe[class='embedido']")
    public WebElement embedido;
    @FindBy(css = "img[class='card-img']")
    public WebElement fotoArea;
    public AreaInfo(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
