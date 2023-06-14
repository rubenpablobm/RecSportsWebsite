/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

public class BorrarEdificioTest {
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

    // Test Scenario ID: HURF-24
    // Test Case ID: TC-HURF-24
    @Test(priority = 3)
    public void testBorrarEdificio() {

        // Find all the buttons with the specified ID
        List<WebElement> nombres = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = nombres.get(nombres.size() - 1);
        String nombre = lastNombre.getText();

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
        if(alertText == "Realmente deseas eliminar el registro titulo="+nombre){
            // Accept the alert
            alert.accept();
        }
        else{
            // Dismiss the alert
            alert.dismiss();
        }

        // Reload the page
        driver.navigate().refresh();
    }
}
