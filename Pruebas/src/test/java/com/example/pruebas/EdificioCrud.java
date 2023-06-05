package com.example.pruebas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;


// page_url = http://localhost:4200/

public class EdificioCrud {
    @FindBy(css = "span[class^='mdc-button']")
    public WebElement spanAdmin;

    @FindBy(css = "input[id='exampleInputEmail1']")
    public WebElement inputExampleEmail;

    @FindBy(css = "input[id='exampleInputPassword1']")
    public WebElement inputExamplePassword;

    @FindBy(css = "button[class$='btn-primary']")
    public WebElement buttonSubmit;

    @FindBy(css = "button[class='navbar-toggler']")
    public WebElement buttonCollapse;

    @FindBy(css = "button[routerlink='/edificio-tabla/tabla']")
    public WebElement buttonEdificios;

    @FindBy(css = "button[class*='btn-success']")
    public WebElement buttonAgregarTabla;

    @FindBy(css = "button[class*='btn-secondary']")
    public WebElement buttonRegresar;

    @FindBy(css = "table[class*='table-light']")
    public WebElement tableEdificios;

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

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")
    public WebElement divCampoObligatorioNombreEditar;

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")
    public WebElement divCampoObligatorioFotoEditar;

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")
    public WebElement divCampoObligatorioLinkMapsEditar;

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")
    public WebElement divNombreExisteEditar;

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")
    public WebElement divFotoInvalidaEditar;

    @FindBy(css = "html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")
    public WebElement divLinkMapsInvalidaEditar;

    @FindBy(css = "div[class^='confirmation-message']")
    public WebElement divEdificioGuardado;

    @FindBy(css = "html > body > app-root > app-tabla-edificio > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(6) > td:nth-of-type(4) > div > a:nth-of-type(2)")
    public WebElement buttonEliminarTabla;


    public EdificioCrud(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
    
    
    
    
    
    
    
    
    
    
}
