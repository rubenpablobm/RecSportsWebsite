/* Descripcion MainPageTest.java: programa que prueba la funcionalidad de la pantalla .
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;
import static org.testng.Assert.*;
import org.testng.annotations.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.FindBy;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class MainPageTest {
    private WebDriver driver;

    private MainPage mainPage;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:4200/");
        mainPage = new MainPage(driver);
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }

    // Test Scenario ID: HURF-1
    @org.junit.jupiter.api.Test
    @Test (priority = 1)
    public void muestraEdificios() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Crear instancia de HttpClient
        HttpClient httpClient = HttpClient.newHttpClient();

        // Crear un objeto HttpRequest con el URL endpoint del API
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5040/edificio"))
                .build();

        // Enviar la solicitud GET y recuperar HttpResponse
        HttpResponse<String> response;
        try {
            response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            fail("An exception occurred while sending the request: " + e.getMessage());
            return;
        }

        // Comprobar el codigo de estado de la respuesta HTTP
        assertEquals(200, response.statusCode());

        // Obtener el cuerpo de la respuesta JSON
        String jsonResponse = response.body();

        // Crear una instancia de Gson
        Gson gson = new Gson();

        // Deserializar el arreglo JSON
        JsonElement jsonElement = gson.fromJson(jsonResponse, JsonElement.class);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        // Crear una lista para almacenar los "Nombres"
        List<String> nombresList = new ArrayList<>();

        // Iterar sobre el arreglo JSON y extraer el valor de "Nombre"
        for (JsonElement element : jsonArray) {
            String nombre = element.getAsJsonObject().get("Nombre").getAsString();
            nombresList.add(nombre);
        }

        mainPage.botonEdificios.click();
        List<WebElement> options = driver.findElements(By.id("opcionEdificios"));

        // Crear una lista para almacenar los textos de las opciones
        List<String> optionTexts = new ArrayList<>();

        // Iterar sobre las opciones y almacenar sus textos
        for (WebElement option : options) {
            String optionText = option.getText();
            optionTexts.add(optionText);
        }

        //Selecciona la opcion "Todos" del menu desplegable
        options.get(options.size()-1).click();

        // Crear instancia de HttpClient
        HttpClient httpClient2 = HttpClient.newHttpClient();

        // Crear un objeto HttpRequest con el URL endpoint del API
        HttpRequest request2 = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5040/area/"))
                .build();

        // Enviar la solicitud GET y recuperar HttpResponse
        HttpResponse<String> response2;
        try {
            response2 = httpClient2.send(request2, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            fail("An exception occurred while sending the request: " + e.getMessage());
            return;
        }

        // Comprobar el codigo de estado de la respuesta HTTP
        assertEquals(200, response2.statusCode());

        // Obtener el cuerpo de la respuesta JSON
        String jsonResponse2 = response2.body();

        // Crear una instancia de Gson
        Gson gson2 = new Gson();

        // Deserializar el arreglo JSON
        JsonElement jsonElement2 = gson2.fromJson(jsonResponse2, JsonElement.class);
        JsonArray jsonArray2 = jsonElement2.getAsJsonArray();

        // Crear una lista para almacenar los "Nombres"
        List<String> nombresList2 = new ArrayList<>();

        // Iterar sobre el arreglo JSON y extraer el valor de "Nombre"
        for (JsonElement element : jsonArray2) {
            String nombre2 = element.getAsJsonObject().get("Nombre").getAsString();
            nombresList2.add(nombre2);
        }

        System.out.println(nombresList2);

        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));
        List<WebElement> tarjetasAreas = driver.findElements(By.cssSelector(".area-card"));

        // Crear una lista para almacenar los textos de las opciones
        List<String> optionTexts2 = new ArrayList<>();

        // Iterar sobre las opciones y almacenar sus textos
        for (WebElement card : tarjetasAreas) {
            String optionText2 = card.getText();
            optionTexts.add(optionText2);
        }

        System.out.println(optionTexts2);

        // Test Case ID: TC-HURF-1
        assertTrue(optionTexts.equals(nombresList));
        //assertTrue(driver.findElement(By.cssSelector("ul[data-bs-popper='static']")).isDisplayed());
    }

    //HURF-2 Como alumno quiero visualizar en area tipo aforo la cantidad de personas que lo estan usando en tiempo real para saber si puedo utilizar las instalaciones en ese momento.
    @Test (priority = 2)
    public void muestraAforo() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        //Selecciona el menu desplegable "Edificios" y elige la opcion "Todos"
        mainPage.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();

        //Busca las tarjetas de tipo aforo y verifica que muestre el aforo
        List<WebElement> tarjetasAforo = driver.findElements(By.id("areaCardAforo"));
        for(WebElement elemento:tarjetasAforo){
            wait.until((ExpectedCondition<Boolean>) webDriver -> {
                // Verifica si todas las imágenes estan completamente cargadas
                return ((JavascriptExecutor) webDriver).executeScript("return document.readyState").equals("complete")
                        && ((JavascriptExecutor) webDriver).executeScript("return Array.from(document.querySelectorAll('.area-card .card-img')).every(img => img.complete)").equals(true);
            });
            assertTrue(elemento.findElement(By.cssSelector(".card-title")).isDisplayed());
            assertTrue(elemento.findElement(By.tagName("img")).isDisplayed());
            assertTrue(elemento.findElement(By.xpath(".//label[contains(text(), 'personas')]")).isDisplayed());
            assertTrue(elemento.findElement(By.tagName("progress")).isDisplayed());
        }
    }

    @Test (priority = 3)
    public void muestraAreaAforo() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        mainPage.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));
        List<WebElement> tarjetasAforo = mainPage.contenedorAforo.findElements(By.cssSelector(".area-card"));
        List<String> areas = new ArrayList<String>();
        for(WebElement elemento:tarjetasAforo){
            areas.add(elemento.findElement(By.cssSelector(".card-title")).getText());

        }
        int index=0;
        for(WebElement elemento:tarjetasAforo){
            try {
                elemento.click();
                assertTrue(elemento.findElement(By.cssSelector("h1[class='fw-light']")).getText().contains(areas.get(index)));
            } catch (StaleElementReferenceException e) {
                continue;
            }

        }
    }

    //HURF-3 Como alumno quiero conocer una breve descripción de los tipos de área para conocer sus detalles y dinámica.

    @Test (priority = 4)
    public void muestraAyuda(){
        WebElement tooltipAforo= mainPage.divAreasAforo.findElement(By.cssSelector("div.help"));

        WebElement tooltipInstructivas = mainPage.divClasesInstructivas.findElement(By.cssSelector("div.help"));

        WebElement tooltipAccesoLibre = mainPage.divAreasAccesoLibre.findElement(By.cssSelector("div.help"));
        assertTrue(tooltipAccesoLibre.isDisplayed() && tooltipInstructivas.isDisplayed() && tooltipAforo.isDisplayed());
        assertEquals("Son áreas donde debes registrar tu entrada y salida.", tooltipAforo.getAttribute("tooltip"));
        assertEquals("Son clases que puedes registrar individualmente en cualquier momento del semestre.", tooltipInstructivas.getAttribute("tooltip"));
        assertEquals("Son áreas abiertas que puedes reservar si lo necesitas.", tooltipAccesoLibre.getAttribute("tooltip"));

    }

    //HURF-4 Como alumno quiero visualizar si un área tiene un aviso para estar notificado con anticipación.

    @Test (priority = 5)
    public void muestraAvisoTarjeta(){

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        mainPage.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));

        List<WebElement> tarjetasAforo = mainPage.contenedorAforo.findElements(By.cssSelector(".area-card"));
        List<WebElement> tarjetasInstructivas= mainPage.contenedorInstructivas.findElements(By.cssSelector(".area-card"));
        List<WebElement> tarjetasAccesoLibre = mainPage.contenedorAccesoLibre.findElements(By.cssSelector(".area-card"));
        List<WebElement> areasAviso= new ArrayList<>();

        for(WebElement elemento:tarjetasAforo){
            try{
                elemento.findElement(By.cssSelector("span[class^='badge']")).isDisplayed();
                areasAviso.add(elemento);

            } catch (NoSuchElementException e) {
                continue;
            };
        }
        for(WebElement elemento:tarjetasInstructivas) {
            try {
                elemento.findElement(By.cssSelector("span[class^='badge']")).isDisplayed();
                areasAviso.add(elemento);

            } catch (NoSuchElementException e) {
                continue;
            }
            ;
        }

        for(WebElement elemento:tarjetasAccesoLibre) {
            try {
                elemento.findElement(By.cssSelector("span[class^='badge']")).isDisplayed();
                areasAviso.add(elemento);

            } catch (NoSuchElementException e) {
                continue;
            }
            ;
        }


        for(WebElement elemento:areasAviso){
            try {
                elemento.click();
                wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("div[class^='area-alert']")));
                assertTrue(driver.findElement(By.cssSelector("div[class^='area-alert']")).isDisplayed());
            } catch (StaleElementReferenceException e) {
                continue;
            };
        }


    }

    //HURF 5 Como alumno quiero consultar la información completa al seleccionar un área en específico para utilizar de manera correcta las instalaciones.

    @Test (priority = 6)
    public void muestraInfo(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        mainPage.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));

        List<WebElement> tarjetasAforo = mainPage.contenedorAforo.findElements(By.cssSelector(".area-card"));
        List<WebElement> tarjetasInstructivas= mainPage.contenedorInstructivas.findElements(By.cssSelector(".area-card"));
        List<WebElement> tarjetasAccesoLibre = mainPage.contenedorAccesoLibre.findElements(By.cssSelector(".area-card"));
        List<WebElement> areas= new ArrayList<>();

        for(WebElement elemento:tarjetasAforo){
            areas.add(elemento);
        }
        for(WebElement elemento:tarjetasInstructivas) {
            areas.add(elemento);
        }

        for(WebElement elemento:tarjetasAccesoLibre) {
            areas.add(elemento);
        }


        for(WebElement elemento:areas){
            try {
                elemento.click();
                wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".croquis")));
                assertTrue(driver.findElement(By.cssSelector(".fw-bold")).isDisplayed());
                assertTrue(driver.findElement(By.cssSelector(".fw-bold.mt-2.mb-0")).isDisplayed());
                driver.findElement(By.cssSelector("button[ng-reflect-router-link='/1']")).click();
                assertEquals(driver.getCurrentUrl(),"http://localhost:4200/1");

            } catch (StaleElementReferenceException e) {
                continue;
            };
        }
    }

    //HURF 6 Como alumno quiero reservar un área tipo disponibilidad o instructiva, según los horarios disponibles para apartar el espacio donde realizaré deporte.
    @Test (priority = 7)
    public void muestraReservas(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        mainPage.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));


        List<WebElement> tarjetasInstructivas= mainPage.contenedorInstructivas.findElements(By.cssSelector(".area-card"));
        List<WebElement> tarjetasAccesoLibre = mainPage.contenedorAccesoLibre.findElements(By.cssSelector(".area-card"));
        List<WebElement> areas= new ArrayList<>();


        for(WebElement elemento:tarjetasInstructivas) {
            areas.add(elemento);
        }

        for(WebElement elemento:tarjetasAccesoLibre) {
            areas.add(elemento);
        }


        for(WebElement elemento:areas){
            try {
                elemento.click();
                wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("iframe")));
                assertTrue(driver.findElement(By.tagName("iframe")).isDisplayed());

            } catch (StaleElementReferenceException e) {
                continue;
            };
        }


    }

    // HURF 7 Como alumno quiero registrar mi entrada o salida de un área tipo aforo de manera manual, en caso que no estén disponibles los sensores. 
//    @Test
//    public void actualizaAforo(){
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//        mainPage.botonEdificios.click();
//        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
//        List<WebElement> elementosDropdown = mainPage.dropdownEdificios.findElements(By.tagName("li"));
//        elementosDropdown.get(elementosDropdown.size()-1).click();
//        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));
//
//        List<WebElement> tarjetasAforo = mainPage.contenedorAforo.findElements(By.cssSelector(".area-card"));
//
//
//
//        for(WebElement elemento:tarjetasAforo){
//            try {
//                elemento.click();
//                driver.findElement(By.xpath("//*[text() = ' Registro manual ']")).click();
//                wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".progress")));
//                wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("button")));
//                WebElement barraProgreso = driver.findElement(By.cssSelector(".progress-bar"));
//                Pattern pattern = Pattern.compile("(\\d+)\\/");
//                String aforoTexto = barraProgreso.getText();
//                Matcher matcher = pattern.matcher(aforoTexto);
//                int aforoActual = 0;
//                if (matcher.find()) {
//                    String valorEncontrado = matcher.group(1);
//                    aforoActual = Integer.parseInt(valorEncontrado);
//                }
//                driver.findElement(By.xpath("//*[text() = ' Salida ']")).click();
//                aforoTexto = barraProgreso.getText();
//                matcher = pattern.matcher(aforoTexto);
//                int aforoNext = 0;
//                if (matcher.find()) {
//                    String valorEncontrado = matcher.group(1);
//                    aforoActual = Integer.parseInt(valorEncontrado);
//                }
//                assertEquals(aforoNext,aforoActual-1);
//
//                matcher = pattern.matcher(aforoTexto);
//                if (matcher.find()) {
//                    String valorEncontrado = matcher.group(1);
//                    aforoActual = Integer.parseInt(valorEncontrado);
//                }
//                driver.findElement(By.xpath("//*[text() = ' Entrada ']")).click();
//                aforoTexto = barraProgreso.getText();
//                matcher = pattern.matcher(aforoTexto);
//                aforoNext = 0;
//                if (matcher.find()) {
//                    String valorEncontrado = matcher.group(1);
//                    aforoActual = Integer.parseInt(valorEncontrado);
//                }
//                assertEquals(aforoNext,aforoActual+1);
//
//            } catch (StaleElementReferenceException e) {
//                continue;
//            };
//        }
//    }
//
}