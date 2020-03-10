import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './shared/estrutura/cabecalho/cabecalho.component';
import { RodapeComponent } from './shared/estrutura/rodape/rodape.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './shared/servicos/interceptor.service';
import { DetalheComponent } from './home/detalhe/detalhe.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/estrutura/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    DetalheComponent,
    HomeComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: InterceptorService,
     multi: true,
    },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
