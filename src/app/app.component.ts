// it imports the Component symbol from the Angular core library
import { Component } from '@angular/core';

// this is an annotation
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // this is a property inside the AppComponent class
  title = 'My location';
}
