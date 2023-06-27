import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TaskComponent } from 'src/app/components';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
  declarations: [HomeComponent, AddTaskComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TaskComponent,
  ],
})
export class HomeModule {}
