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
public class MainPage {
    @FindBy(css = "a[data-bs-toggle='dropdown']")
    public WebElement botonEdificios;

    @FindBy(css = "span[class^='mdc-button']")
    public WebElement botonAdmin;

    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Aforo']")
    public WebElement contenedorAforo;

    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(1)")
    public WebElement divAreasAforo;

    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(2)")
    public WebElement divClasesInstructivas;

    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(3)")
    public WebElement divAreasAccesoLibre;

    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Instructiva']")
    public WebElement contenedorInstructivas;

    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Reservacion']")
    public WebElement contenedorAccesoLibre;

    @FindBy(css = "ul[data-bs-popper='static']")
    public WebElement dropdownEdificios;

    public MainPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}