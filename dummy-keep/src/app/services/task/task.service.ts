import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from 'src/app/models/task';
import { BehaviorSubject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = environment.baseUrl;
  private loadingPage = new BehaviorSubject<boolean>(false);
  private loadingAction = new BehaviorSubject<boolean>(false);
  private tasks = new BehaviorSubject<Task[] | null>(null);

  tasks$ = this.tasks.asObservable();
  loadingPage$ = this.loadingPage.asObservable();
  loadingAction$ = this.loadingAction.asObservable();

  constructor(private httpClient: HttpClient) {}

  getTask(id: string) {
    const url = `${this.baseUrl}/task`;
    const params = new HttpParams().set('id', id);
    return this.httpClient.get(url, { params }).pipe(
      map((resp: any) => {
        this.loadingAction.next(false);
        return resp.task;
      }),
      catchError((err) => {
        this.loadingAction.next(false);
        console.error(err.error.msg);
        return of(null);
      })
    );
  }

  getTasks() {
    this.loadingPage.next(true);
    const url = `${this.baseUrl}/task/all`;
    this.httpClient
      .get(url)
      .pipe(
        catchError((err) => {
          this.loadingPage.next(false);
          console.error(err.error.msg);
          return of(err.error.success);
        })
      )
      .subscribe((resp) => {
        this.tasks.next(resp.tasks!);
        this.loadingPage.next(false);
      });
  }

  createTask(task: Task) {
    this.loadingAction.next(true);
    const url = `${this.baseUrl}/task`;
    const body = task;
    return this.httpClient.post(url, body).pipe(
      map((resp) => {
        this.loadingAction.next(false);
        return true;
      }),
      catchError((err) => {
        this.loadingAction.next(false);
        console.error(err.error.msg);
        return of(false);
      })
    );
  }

  deleteTask(id: string) {
    this.loadingAction.next(true);
    const url = `${this.baseUrl}/task`;
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete(url, { params }).pipe(
      map((resp) => {
        this.loadingAction.next(false);
        return true;
      }),
      catchError((err) => {
        this.loadingAction.next(false);
        console.error(err.error.msg);
        return of(false);
      })
    );
  }

  updateTask(_id: string, updates: any) {
    this.loadingAction.next(true);
    const url = `${this.baseUrl}/task/update`;
    const body = { _id, updates };
    return this.httpClient.post(url, body).pipe(
      map((resp) => {
        this.loadingAction.next(false);
        return true;
      }),
      catchError((err) => {
        this.loadingAction.next(false);
        console.error(err.error.msg);
        return of(false);
      })
    );
  }
}
