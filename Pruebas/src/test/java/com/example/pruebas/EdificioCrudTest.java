package com.example.pruebas;
import org.openqa.selenium.support.FindBy;
import org.testng.annotations.*;

import static org.testng.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import java.util.regex.Pattern;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.JavascriptExecutor;
import java.util.regex.Matcher;

public class EdificioCrudTest {
    private WebDriver driver;
    private EdificioCrud edificioCrud;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:4200/admin/login");

        edificioCrud = new EdificioCrud(driver);
        edificioCrud.inputExampleEmail.sendKeys("alma10@gmail.com");
        edificioCrud.inputExamplePassword.sendKeys("Alberto1#");
        edificioCrud.buttonSubmit.click();
        edificioCrud.buttonCollapse.click();
        edificioCrud.buttonEdificios.click();

    }

    @AfterMethod
    public void tearDown() {
        driver.quit();

    }

    //HURF-1 Como alumno quiero consultar áreas de un edificio para conocer el listado de oferta de RecSports Open.
    @Test
    public void testAgregarEdificio() {

        //Cuando todos los campos no son llenados
        edificioCrud.buttonAgregarTabla.click();
        edificioCrud.inputNombreAgregar.sendKeys("");
        edificioCrud.inputFotoAgregar.sendKeys("");
        edificioCrud.inputLinkMapsAgregar.sendKeys("");
        edificioCrud.buttonAgregarEdificio.click();

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")).isDisplayed());

        //Cuando todos los campos son llenados con entradas incorrectas
        edificioCrud.inputNombreAgregar.sendKeys("Wellness Center");
        edificioCrud.inputFotoAgregar.sendKeys("estoNoEsUnaFoto");
        edificioCrud.inputLinkMapsAgregar.sendKeys("estoNoEsUnLinkDeGoogleMaps");

    }

}
