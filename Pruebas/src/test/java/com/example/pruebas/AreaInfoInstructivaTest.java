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
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import static org.testng.Assert.*;

public class AreaInfoInstructivaTest {
    private WebDriver driver;

    private AreaInfo areaInfo;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:4200/");
        areaInfo = new AreaInfo(driver);
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }

    // Test Scenario ID: HURF-5
    // Test Case ID: TC2-HURF-5
    @Test(priority = 1)
    public void muestraInfo(){

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        areaInfo.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = areaInfo.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));

        WebElement tarjetaInstructiva = areaInfo.contenedorInstructivas.findElement(By.cssSelector(".area-card"));
        JavascriptExecutor jse2 = (JavascriptExecutor)driver;
        jse2.executeScript("arguments[0].scrollIntoView()", tarjetaInstructiva);
        wait.until(ExpectedConditions.elementToBeClickable(tarjetaInstructiva));
        if (tarjetaInstructiva.isDisplayed() && tarjetaInstructiva.isEnabled()) {
            jse2.executeScript("arguments[0].click();", tarjetaInstructiva);
        }

        tarjetaInstructiva.click();

        // Wait until the elements are displayed
        wait.until(ExpectedConditions.visibilityOf(areaInfo.nombreArea));
        wait.until(ExpectedConditions.visibilityOf(areaInfo.horariosArea));
        wait.until(ExpectedConditions.visibilityOf(areaInfo.descripcionArea));
        wait.until(ExpectedConditions.visibilityOf(areaInfo.imageCroquis));
        wait.until(ExpectedConditions.visibilityOf(areaInfo.fotoArea));
        wait.until(ExpectedConditions.visibilityOf(areaInfo.embedido));

        String idEdificio = null;

        try {
            URI uri = new URI(driver.getCurrentUrl());
            String[] pathSegments = uri.getPath().split("/");
            idEdificio = pathSegments[pathSegments.length - 1];
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        // Crear instancia de HttpClient
        HttpClient httpClient = HttpClient.newHttpClient();

        // Crear un objeto HttpRequest con el URL endpoint del API
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5040/area/"+idEdificio))
                .build();

        // Enviar la solicitud GET y recuperar HttpResponse
        HttpResponse<String> response = null ;
        try {
            response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            fail("An exception occurred while sending the request: " + e.getMessage());
        }

        // Comprobar el codigo de estado de la respuesta HTTP
        assertEquals(200, response.statusCode());

        // Obtener el cuerpo de la respuesta JSON
        String jsonResponse = response.body();

        // Crear una instancia de Gson
        Gson gson = new Gson();

        // Deserializar el arreglo JSON
        JsonObject jsonObject = gson.fromJson(jsonResponse, JsonObject.class);
        // Obtener los valores de cada campo
        String nombre = jsonObject.get("Nombre").getAsString();
        String horarios = jsonObject.get("Horarios").getAsString();
        String descripcion = jsonObject.get("Descripcion").getAsString();
        String foto = jsonObject.get("Foto").getAsString();
        String croquis = jsonObject.get("Croquis").getAsString();

        // Infomracion actual desplegada del area seleccionada
        String nombreArea = areaInfo.nombreArea.getText();
        String horariosArea = areaInfo.horariosArea.getText().replaceAll("\n", "\\\\n");
        String descripcionArea = areaInfo.descripcionArea.getText().replaceAll("\n", "\\\\n");
        String fotoSrc = areaInfo.fotoArea.getAttribute("src");
        String croquisSrc = areaInfo.imageCroquis.getAttribute("src");

        assertEquals(nombreArea, nombre);
        assertEquals(horariosArea, horarios);
        assertEquals(descripcionArea, descripcion);
        assertEquals(fotoSrc, foto);
        assertEquals(croquisSrc, croquis);
        assertTrue(areaInfo.embedido.isDisplayed());

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
