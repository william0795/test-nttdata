import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'productos', loadChildren: () => import('./pages/modulos/productos/productos.module').then(m => m.ProductosModule) },
  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
