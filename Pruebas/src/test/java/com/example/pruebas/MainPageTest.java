package com.example.pruebas;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;

public class MainPageTest {
    private WebDriver driver;
    private MainPage mainPage;


    public WebElement ulStatic;

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
        assertNotNull(driver.findElement(By.cssSelector("ul[data-bs-popper='static']")));
    }

    @Test
    public void muestraAdmin() {
        mainPage.botonAdmin.click();
        assertEquals(driver.getCurrentUrl(),"http://localhost:4200/admin");
    }

    //HURF-2

}