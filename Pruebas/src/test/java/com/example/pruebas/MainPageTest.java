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
import java.util.regex.Pattern;
import org.openqa.selenium.StaleElementReferenceException;
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


    //HURF-1 Como alumno quiero consultar áreas de un edificio para conocer el listado de oferta de RecSports Open.
    @Test
    public void muestraEdificios() {
        mainPage.botonEdificios.click();
        assertTrue(driver.findElement(By.cssSelector("ul[data-bs-popper='static']")).isDisplayed());
    }

    @Test
    public void muestraAdmin() {

        mainPage.botonAdmin.click();
        assertEquals(driver.getCurrentUrl(),"http://localhost:4200/admin");
    }

    //HURF-2 Como alumno quiero visualizar en área tipo aforo la cantidad de personas que lo están usando en tiempo real para saber si puedo utilizar las instalaciones en ese momento.
    @Test
    public void muestraAforo() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));
        List<WebElement> tarjetasAforo = mainPage.contenedorAforo.findElements(By.cssSelector(".area-card"));
        for(WebElement elemento:tarjetasAforo){
            assertTrue(elemento.findElement(By.cssSelector(".card-title")).isDisplayed());
            assertTrue(elemento.findElement(By.tagName("img")).isDisplayed());
            assertTrue(elemento.findElement(By.xpath(".//label[contains(text(), 'personas')]")).isDisplayed());
            assertTrue(elemento.findElement(By.tagName("progress")).isDisplayed());
        }
    }

    @Test
    public void muestraAreaAforo() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
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


}