import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() id: string = '0';
  @Input() title: string = 'Task Title';
  @Input() date: Date = new Date();
  @Input() description: string = 'Task description';

  constructor(private taskService: TaskService, private router: Router) {}

  delete() {
    this.taskService.deleteTask(this.id).subscribe((success) => {
      if (success === true) {
        this.taskService.getTasks();
      }
    });
  }

  update() {
    this.router.navigate(['home/add'], { queryParams: { id: this.id } });
  }
}
