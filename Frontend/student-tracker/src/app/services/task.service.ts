import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "https://student-performance-tracker-h2et.onrender.com/api/tasks";

  constructor(private http: HttpClient) {}

  addTask(taskData: any) {
  return this.http.post(
    'https://student-performance-tracker-h2et.onrender.com/api/tasks'
,    taskData
  );
}
getTasks(userId: string) {
  return this.http.get(
    `https://student-performance-tracker-h2et.onrender.com/api/tasks/${userId}`
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
    `https://student-performance-tracker-h2et.onrender.com/api/tasks/streak/${userId}`
  );

}
getSubjectPrediction() {
  return this.http.get(
    'https://student-performance-tracker-1-qmtm.onrender.com/api/predict/subject-performance'
  );
}
getAIRecommendations() {

  return this.http.get(

    'https://student-performance-tracker-1-qmtm.onrender.com/api/recommend-tasks'

  );

}
}