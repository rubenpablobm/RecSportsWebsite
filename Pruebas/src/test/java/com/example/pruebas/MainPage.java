package com.example.pruebas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;



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




    public MainPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
