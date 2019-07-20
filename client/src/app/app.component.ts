import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private router: Router){}

  navigate(){
    this.router.navigate(['/home'])
  }

}
