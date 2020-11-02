import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations:[
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinner,
    AlertComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinner,
    AlertComponent,
    CommonModule
  ],
  entryComponents:[
    AlertComponent
  ]

})
export  class SharedModule{}
