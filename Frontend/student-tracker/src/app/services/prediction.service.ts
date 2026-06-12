import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PredictionService {

  apiUrl = 'http://127.0.0.1:5001/predict-performance';

  constructor(private http: HttpClient) {}

getPrediction(userId: string) {

  return this.http.get(

    `http://127.0.0.1:5001/predict-performance/${userId}`

  );

}
}