/* Descripcion MainPageTest.java: clase utilizada para ubicar elementos de
la página principal.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 12/06/2023 */

package com.example.pruebas;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class MainPage {
    @FindBy(css = "a[data-bs-toggle='dropdown']")
    public WebElement botonEdificios;
    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Aforo']")
    public WebElement contenedorAforo;
    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(1)")
    public WebElement divAreasAforo;
    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(2)")
    public WebElement divClasesInstructivas;
    @FindBy(css = "html > body > app-root > app-home > div:nth-of-type(3)")
    public WebElement divAreasAccesoLibre;
    @FindBy(css = "ul[data-bs-popper='static']")
    public WebElement dropdownEdificios;
    public MainPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}