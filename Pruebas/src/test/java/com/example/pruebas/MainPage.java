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

    @FindBy(css = "div[tooltip='Son áreas donde debes registrar tu entrada y salida.']")
    public WebElement tooltipAforo;

    @FindBy(css = "div[tooltip='Son clases que puedes registrar individualmente en cualquier momento del semestre.']")
    public WebElement tooltipInstructivas;

    @FindBy(css = "div[tooltip='Son áreas abiertas que puedes reservar si lo necesitas.']")
    public WebElement tooltipAccesoLibre;
    @FindBy(css = "app-area-card[ng-reflect-tipo-area='Aforo']")
    public WebElement contenedorAforo;


    public MainPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
