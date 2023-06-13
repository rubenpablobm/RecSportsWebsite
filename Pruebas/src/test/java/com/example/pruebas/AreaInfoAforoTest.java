/* Descripcion MainPageTest.java: programa que define la logica del componente "navbar".
Su proposito es llamar al servicio API por medio de funciones.
Porpiedad del equipo WellSoft.
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 07/06/2023
Fecha de modificacion: 07/06/2023 */

package com.example.pruebas;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class AreaInfoAforoTest {

    private WebDriver driver;

    private AreaInfo areaInfo;

    //HURF 5 Como alumno quiero consultar la información completa al seleccionar un área en específico para utilizar de manera correcta las instalaciones.

    @Test(priority = 5)
    public void muestraInfo(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        areaInfo.botonEdificios.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".dropdown-item")));
        List<WebElement> elementosDropdown = areaInfo.dropdownEdificios.findElements(By.tagName("li"));
        elementosDropdown.get(elementosDropdown.size()-1).click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".area-card")));

        List<WebElement> tarjetasAforo = areaInfo.contenedorAforo.findElements(By.cssSelector(".area-card"));

        for(WebElement elemento:tarjetasAforo){
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
}
