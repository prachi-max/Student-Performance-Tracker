import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PredictionService {

  apiUrl = 'https://student-performance-tracker-1-qmtm.onrender.com';


  constructor(private http: HttpClient) {}

getPrediction(userId: string) {

 return this.http.get(
  `${this.apiUrl}/predict-performance/${userId}`
);

}
}