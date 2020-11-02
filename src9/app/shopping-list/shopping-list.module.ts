import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { LoggingService } from '../logging.serice';


//import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
    ])
   // SharedModule
  ],
  providers:[
    LoggingService
  ]
  //we can omit entry ng>9
  // entryComponents:[
  //   AlertComponent
  // ],

})
export class ShoppingListModule {}
