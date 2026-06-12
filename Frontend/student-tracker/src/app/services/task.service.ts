import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:5000/api/tasks";

  constructor(private http: HttpClient) {}

  addTask(taskData: any) {
  return this.http.post(
    'http://localhost:5000/api/tasks',

    taskData
  );
}
getTasks(userId: string) {
  return this.http.get(
    `http://localhost:5000/api/tasks/${userId}`
  );
}

updateTask(id: string, data: any) {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

deleteTask(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
getStreak(userId:string) {

  return this.http.get(
    `http://localhost:5000/api/tasks/streak/${userId}`
  );

}
getSubjectPrediction() {

  return this.http.get(
    'http://localhost:5000/api/predict/subject-performance'
  );

}
getAIRecommendations() {

  return this.http.get(

    'http://127.0.0.1:5001/api/recommend-tasks'

  );

}
}