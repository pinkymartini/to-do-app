import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlService {

  constructor() { }

  
  scroll(id:string) {
    setTimeout(() => {
      const targetDiv = document.getElementById(id);
      const rect = targetDiv.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset,
        behavior: 'smooth'
      });
    }, 0);
}

}
