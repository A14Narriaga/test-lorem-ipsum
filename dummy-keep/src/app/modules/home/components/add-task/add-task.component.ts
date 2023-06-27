import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../../services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  id = null;
  formGroup: UntypedFormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    date: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ id }) => {
      if (id) {
        this.taskService.getTask(id).subscribe((task) => {
          if (task) {
            this.id = task._id;
            this.formGroup.setValue({
              title: task.title,
              date: task.date,
              description: task.description,
            });
          }
        });
      }
    });
  }

  createTask() {
    if (this.formGroup.valid) {
      this.taskService.createTask(this.formGroup.value).subscribe((success) => {
        if (success === true) {
          this.taskService.getTasks();
          this.router.navigateByUrl('');
        }
      });
    }
  }

  updateTask(id: string) {
    this.taskService
      .updateTask(id, this.formGroup.value)
      .subscribe((success) => {
        if (success === true) {
          this.taskService.getTasks();
          this.router.navigateByUrl('');
        }
      });
  }
}
