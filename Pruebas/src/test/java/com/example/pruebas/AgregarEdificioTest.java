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
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class AgregarEdificioTest {
    private WebDriver driver;
    private EdificioCrud edificioCrud;

    //Login y visualizacion de tabla de edificios
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
        edificioCrud.buttonEdificios.click();

    }

    //Fin del metodo
    @AfterMethod
    public void tearDown() {
        driver.quit();

    }

    // Test Scenario ID: HURF-22
    // Test Case ID: TC-HURF-22
    @Test(priority = 1)
    public void testAgregarEdificio() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        System.out.println("Number of rows:");
        System.out.println(driver.findElement(By.tagName("table")).findElements(By.tagName("tr")).size());
        System.out.println("Number of columns:");
        System.out.println(driver.findElement(By.tagName("table")).findElements(By.tagName("th")).size());

        //Cuando todos los campos no son llenados
        edificioCrud.buttonAgregarTabla.click();
        edificioCrud.buttonAgregarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese nombre de edificio.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese URL de foto.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese URL de google maps.");

        //Cuando todos los campos son llenados con entradas incorrectas
        edificioCrud.inputNombre.sendKeys("Wellness Center");
        edificioCrud.inputFoto.sendKeys("estoNoEsUnaFoto");
        edificioCrud.inputLinkMaps.sendKeys("estoNoEsUnLinkDeGoogleMaps");
        edificioCrud.buttonAgregarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(1) > div > div")).getText(), "*Nombre ya existe. Intente de nuevo.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(2) > div > div")).getText(), "*Entrada no es una foto. Intente de nuevo.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-agregar-edificio > div > form > div:nth-of-type(3) > div > div")).getText(), "*Entrada no es un link de google maps. Intente de nuevo.");

        //Limpiar todos los campos
        edificioCrud.inputNombre.clear();
        edificioCrud.inputFoto.clear();
        edificioCrud.inputLinkMaps.clear();

        //Cuando todos los campos son llenados con entradas correctas
        edificioCrud.inputNombre.sendKeys("Wellness Center 3");
        edificioCrud.inputFoto.sendKeys("https://www.milenio.com/uploads/media/2021/11/04/el-wellness-center-cuenta-con.jpeg");
        edificioCrud.inputLinkMaps.sendKeys("https://goo.gl/maps/qi6RCaEo9Wiif4i77");
        edificioCrud.buttonAgregarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[class^='confirmation-message']")));

        assertTrue(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).getText(), "Edificio agregado exitosamente.");
        edificioCrud.buttonCancelarAgregarEdificio.click();

        List<WebElement> nombres = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = nombres.get(nombres.size() - 1);

        // Wait for the expected text to be present in the element
        wait.until(ExpectedConditions.textToBePresentInElement(lastNombre, "Wellness Center 3"));
        assertEquals(lastNombre.getText(), "Wellness Center 3");

    }
}
