import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{StoreModule} from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.serice';
import { ShoppingListReducer } from './shopping-list/store/shoppin-list.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList:ShoppingListReducer}),
    SharedModule,
    CoreModule
  ],
  providers:[
    LoggingService
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
