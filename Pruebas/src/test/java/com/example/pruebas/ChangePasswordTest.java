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
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ChangePasswordTest {
    private WebDriver driver;
    private ChangePassword changePassword;

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

        changePassword = new ChangePassword(driver);
        changePassword.inputExampleEmail.sendKeys("alma10@gmail.com");
        changePassword.inputExamplePassword.sendKeys("Alberto1#");
        changePassword.buttonSubmit.click();
        changePassword.buttonContrase.click();

    }

    //Fin del metodo
    @AfterMethod
    public void tearDown() {
        driver.quit();

    }

    // HURF - 30: Como admin quiero cambiar contraseña del usuario para recuperar la cuenta.
    @Test(priority = 1)
    public void testChangePassword() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        //Cuando las contrasenas no tienen formato requerido
        changePassword.inputEmail.sendKeys("arturo@gmail.com");
        changePassword.inputContrasena.sendKeys("estoEsContrasenaSinFormato");
        changePassword.inputRepContrasena.sendKeys("estoEsContrasenaSinFormato");
        changePassword.botonCambiarContra.click();
        assertEquals(driver.findElement(By.cssSelector("div[id^='mensaje-aviso']")).getText(), "La contraseña debe tener minimo 8 caracteres. Al menos una mayuscula, minuscula, caracter especial y numero de cada uno");

        //Limpiar todos los campos
        changePassword.inputEmail.clear();
        changePassword.inputContrasena.clear();
        changePassword.inputRepContrasena.clear();

        //Cuando las contraseñas son diferentes
        changePassword.inputEmail.sendKeys("arturo@gmail.com");
        changePassword.inputContrasena.sendKeys("Contrasena1#");
        changePassword.inputRepContrasena.sendKeys("ContraDiferente1#");
        changePassword.botonCambiarContra.click();
        assertEquals(driver.findElement(By.cssSelector("div[id^='mensaje-aviso']")).getText(), "Contraseñas no son iguales");

        //Limpiar todos los campos
        changePassword.inputEmail.clear();
        changePassword.inputContrasena.clear();
        changePassword.inputRepContrasena.clear();

        //Cuando el email no existe
        changePassword.inputEmail.sendKeys("artur235325o@gmail.com");
        changePassword.inputContrasena.sendKeys("Contrasena1#");
        changePassword.inputRepContrasena.sendKeys("Contrasena1#");
        changePassword.botonCambiarContra.click();
        assertEquals(driver.findElement(By.cssSelector("div[id^='mensaje-aviso']")).getText(), "Usuario no existente");

        //Limpiar todos los campos
        changePassword.inputEmail.clear();
        changePassword.inputContrasena.clear();
        changePassword.inputRepContrasena.clear();

        //Cuando las contraseñas son correctas
        changePassword.inputEmail.sendKeys("arturo@gmail.com");
        changePassword.inputContrasena.sendKeys("Contrasena1#");
        changePassword.inputRepContrasena.sendKeys("Contrasena1#");
        changePassword.botonCambiarContra.click();

        // Switch to the alert
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert();

        // Get the text of the alert
        String alertText = alert.getText();
        if(alertText == "Contraseña cambiada exitosamente"){
            // Accept the alert y fin
            alert.accept();
        }

        changePassword.buttonContrase.click();

    }
}
