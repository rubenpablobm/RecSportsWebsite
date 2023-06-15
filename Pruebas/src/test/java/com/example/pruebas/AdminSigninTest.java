/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
import org.openqa.selenium.*;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;
import java.util.List;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class AdminSigninTest {
    private WebDriver driver;
    private AdminSignin adminSignin;



    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:4200/admin/login");
        adminSignin= new AdminSignin(driver);

    }
    //Fin del metodo
    @AfterMethod
    public void tearDown() {
        driver.quit();

    }

    //HURF-22: Como admin
    @Test (priority = 1)
    public void IncioSesion() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        //Cuando todos los campos no son llenados
        adminSignin.buttonSubmit.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h1[class='ini']")));



        assertTrue(driver.findElement(By.cssSelector("h1[class='ini']")).isDisplayed());


        //Cuando ingresamos un correo incorrecto
        adminSignin.inputEmail.sendKeys("alma11@gmail.com ");
        adminSignin.inputPassword.sendKeys("Alberto1#");
        adminSignin.buttonSubmit.click();


        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")).getText(), "Usuario no existente");

        //Limpiar todos los campos
        adminSignin.inputEmail.clear();
        adminSignin.inputPassword.clear();

        //Cuando La contraseña es incorrecta
        adminSignin.inputEmail.sendKeys("alma10@gmail.com");
        adminSignin.inputPassword.sendKeys("alberto1#");
        adminSignin.buttonSubmit.click();


        // Wait for the elements to be displayed
        wait.until(ExpectedConditions.visibilityOfElementLocated((By) adminSignin.menuAdmin));

        assertTrue(driver.findElement(By.cssSelector("html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")).isDisplayed());
        assertEquals(driver.findElement(By.cssSelector("html > body > app-root > app-admin > div > div > div:nth-of-type(2) > div:nth-of-type(2)")).getText(), "La contraseña es invalida");

        List<WebElement> emails = driver.findElements(By.id("nombreEdificio"));
        WebElement lastNombre = emails.get(emails.size() - 1);

        // Wait for the expected text to be present in the element
        wait.until(ExpectedConditions.textToBePresentInElement(lastNombre, "Wellness Center 3"));
        assertEquals(lastNombre.getText(), "Wellness Center 3");
    }
}
