package com.example.pruebas;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.testng.annotations.*;

import static org.testng.Assert.*;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import java.util.regex.Pattern;
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
        //edificioCrud.buttonCollapse.click();
        edificioCrud.buttonEdificios.click();

    }

    @AfterMethod
    public void tearDown() {
        driver.quit();

    }

    //HURF-1 Como alumno quiero consultar áreas de un edificio para conocer el listado de oferta de RecSports Open.
    @Test
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

        //driver.findElement(By.cssSelector("html > body > app-root > app-tabla-edificio > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(6) > td:nth-of-type(4) > div > a:nth-of-type(2)")).click();


        //System.out.println("Number of rows:");
        //System.out.println(driver.findElement(By.tagName("table")).findElements(By.tagName("tr")).size());
        //System.out.println("Number of columns:");
        //System.out.println(driver.findElement(By.tagName("table")).findElements(By.tagName("th")).size());
        WebElement table = driver.findElement(By.tagName("table"));
        List<WebElement> rows = table.findElements(By.tagName("tr"));
        WebElement lastRow = rows.get(rows.size() - 1);
        //WebElement button = lastRow.findElement(By.id("borrar"));
        // Check if the button is displayed
        //if (button.isDisplayed()) {
            //System.out.println("Button found and displayed.");

            // Click the button
            //lastRow.findElement(By.id("borrar")).click();

            // Perform other actions after clicking the button
            // ...
        //} else {
            //System.out.println("Button not found or not displayed.");
        //}
        // Switch to the alert
        //Alert alert = driver.switchTo().alert();

// Get the text of the alert
        //String alertText = alert.getText();

// Verify the alert text
        //if (alertText.equals("Realmente deseas eliminar el registro titulo= Wellness Center 3")) {
            // Accept the alert
            //alert.accept();
        //} else {
            // Dismiss the alert
            //alert.dismiss();
       // }

        // Find all the buttons with the specified ID
        List<WebElement> nombres = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = nombres.get(nombres.size() - 1);



        // Wait for the expected text to be present in the element
        wait.until(ExpectedConditions.textToBePresentInElement(lastNombre, "Wellness Center 3"));

        assertEquals(lastNombre.getText(), "Wellness Center 3");

        // Find all the buttons with the specified ID
        //List<WebElement> buttons = driver.findElements(By.id("editar"));
        // Get the last button from the list
        //WebElement lastButton = buttons.get(buttons.size() - 1);
        //JavascriptExecutor jse2 = (JavascriptExecutor)driver;
        //jse2.executeScript("arguments[0].scrollIntoView()", lastButton);
        //wait.until(ExpectedConditions.elementToBeClickable(lastButton));
        //if (lastButton.isDisplayed() && lastButton.isEnabled()) {
            //jse2.executeScript("arguments[0].click();", lastButton);
        //}

        //edificioCrud.buttonCancelarEditarEdificio.click();


    }

    @Test
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
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='Nombre']")));
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='Foto']")));
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[formcontrolname='LinkMaps']")));

        //Limpiar todos los campos
        edificioCrud.inputNombre.clear();
        edificioCrud.inputFoto.clear();
        edificioCrud.inputLinkMaps.clear();
        edificioCrud.buttonGuardarEdificio.click();

        // Wait for the elements to be displayed
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")));
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")));
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(1) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese nombre de edificio.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(2) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese URL de foto.");
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-editar-edificio > div > form > div:nth-of-type(3) > div > div")).getText(), "*Campo obligatorio. Por favor ingrese URL de google maps.");

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

        //Limpiar todos los campos
        edificioCrud.inputNombre.clear();
        edificioCrud.inputFoto.clear();
        edificioCrud.inputLinkMaps.clear();

        //Cuando todos los campos son llenados con entradas correctas
        edificioCrud.inputNombre.sendKeys("Wellness Center 4");
        edificioCrud.inputFoto.sendKeys("https://img.gruporeforma.com/imagenes/960x640/6/54/5053542.jpg");
        edificioCrud.inputLinkMaps.sendKeys("https://goo.gl/maps/P3cXuqbcmtf3v5NP9");
        edificioCrud.buttonAgregarEdificio.click();

        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[class^='confirmation-message']")));

        assertTrue(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("div[class^='confirmation-message']")).getText(), "Edificio guardado exitosamente.");

        // Find all the buttons with the specified ID
        List<WebElement> nombres = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = nombres.get(nombres.size() - 1);

        // Wait for the expected text to be present in the element
        wait.until(ExpectedConditions.textToBePresentInElement(lastNombre, "Wellness Center 4"));
        assertEquals(lastNombre.getText(), "Wellness Center 4");

    }

    @Test
    public void testBorrarEdificio() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Find all the buttons with the specified ID
        List<WebElement> buttons = driver.findElements(By.id("borrar"));
        // Get the last button from the list
        WebElement lastButton = buttons.get(buttons.size() - 1);
        JavascriptExecutor jse2 = (JavascriptExecutor)driver;
        jse2.executeScript("arguments[0].scrollIntoView()", lastButton);
        wait.until(ExpectedConditions.elementToBeClickable(lastButton));
        if (lastButton.isDisplayed() && lastButton.isEnabled()) {
            jse2.executeScript("arguments[0].click();", lastButton);
        }

        // Switch to the alert
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert();

        // Get the text of the alert
        String alertText = alert.getText();

        // Verify the alert text
        if (alertText.equals("Realmente deseas eliminar el registro titulo= Wellness Center 4")) {
            // Accept the alert
            alert.accept();
        } else {
            // Dismiss the alert
            alert.dismiss();
        }

        // Reload the page
        driver.navigate().refresh();
    }

}
