import { inject } from "@angular/core"
import { CrudService } from "./crud.service"
import { Router } from '@angular/router';

export let authGuard = () => {
    const authService = inject(CrudService)
    const router = inject(Router)
  
    if (authService.EstaLogeado()) {
        console.log("Guarda login exitoso");
        return true
    }

    return false//router.navigate(['/login'])
  }