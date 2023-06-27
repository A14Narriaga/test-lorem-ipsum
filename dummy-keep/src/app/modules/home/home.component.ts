import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from '../../services/task/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tasks = { data: [] as Task[], subs: {} as Subscription };

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.tasks.subs = this.taskService.tasks$.subscribe((tasks) =>
      tasks === null ? this.taskService.getTasks() : (this.tasks.data = tasks)
    );
  }

  ngOnDestroy(): void {
    this.tasks.subs.unsubscribe();
  }

  add() {
    this.router.navigateByUrl('/home/add');
  }
}
