/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class EditarEdificioTest {
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

    // Test Scenario ID: HURF-23
    // Test Case ID: TC-HURF-23
    @Test(priority = 2)
    public void testEditarEdificio() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Find all the buttons with the specified ID
        List<WebElement> buttons = driver.findElements(By.id("editar"));
        // Get the last button from the list
        WebElement lastButton = buttons.get(buttons.size() - 1);
        JavascriptExecutor jse2 = (JavascriptExecutor)driver;
        jse2.executeScript("arguments[0].scrollIntoView()", lastButton);
        wait.until(ExpectedConditions.elementToBeClickable(lastButton));
        if (lastButton.isDisplayed() && lastButton.isEnabled()) {
            jse2.executeScript("arguments[0].click();", lastButton);
        }

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='Nombre']")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='Foto']")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='LinkMaps']")));

        //Limpiar todos los campos
        edificioCrud.inputNombre.clear();
        edificioCrud.inputFoto.clear();
        edificioCrud.inputLinkMaps.clear();

        //Cuando todos los campos son llenados con entradas incorrectas
        edificioCrud.inputNombre.sendKeys("Wellness Center");
        edificioCrud.inputFoto.sendKeys("estoNoEsUnaFoto");
        edificioCrud.inputLinkMaps.sendKeys("estoNoEsUnLinkDeGoogleMaps");
        edificioCrud.buttonGuardarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")).getText(), "*Nombre ya existe. Intente de nuevo.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")).getText(), "*Entrada no es una foto. Intente de nuevo.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")).getText(), "*Entrada no es un link de google maps. Intente de nuevo.");

        /*Cuando todos los campos están vacíos:
        java.lang.AssertionError:
        Expected :*Campo obligatorio. Por favor ingrese nombre de edificio.
        Actual   :*Nombre ya existe. Intente de nuevo.*/

        //Limpiar todos los campos
        edificioCrud.inputNombre.clear();
        edificioCrud.inputFoto.clear();
        edificioCrud.inputLinkMaps.clear();

        //Cuando todos los campos son llenados con entradas correctas
        edificioCrud.inputNombre.sendKeys("Wellness Center 4");
        edificioCrud.inputFoto.sendKeys("https://img.gruporeforma.com/imagenes/960x640/6/54/5053542.jpg");
        edificioCrud.inputLinkMaps.sendKeys("https://goo.gl/maps/P3cXuqbcmtf3v5NP9");
        edificioCrud.buttonGuardarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[class^='confirmation-message']")));

        assertTrue(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).getText(), "Edificio guardado exitosamente.");
        edificioCrud.buttonCancelarEditarEdificio.click();

        // Find all the buttons with the specified ID
        List<WebElement> nombres = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = nombres.get(nombres.size() - 1);

        // Wait for the expected text to be present in the element
        wait.until(ExpectedConditions.textToBePresentInElement(lastNombre, "Wellness Center 4"));
        assertEquals(lastNombre.getText(), "Wellness Center 4");
        

        String result = "Launch Successfully";

        // Get the current date and time
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy h:mm a");
        String timestamp = now.format(formatter);

        // Print the message with the result and timestamp
        String message = String.format("[%s]: %s", timestamp, result);
        System.out.println(message);
    }
}
