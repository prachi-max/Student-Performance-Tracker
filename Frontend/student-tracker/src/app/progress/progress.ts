import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { PredictionService } from '../services/prediction.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.css']
})
export class Progress implements OnInit {
  chart: any;
  tasks: any[] = [];

  total = 0;
  completed = 0;
  pending = 0;
  percentage = 0;

  userName: string = '';
  userEmail: string = '';

  currentPage = 0;
  tasksPerPage = 5;

  isSpeaking = false;

  constructor(private taskService: TaskService,
      private cdr: ChangeDetectorRef,
      private predictionService: PredictionService    
  ) {}
  aiRecommendations:any[] = [];
  currentStreak = 0;
  userInitial: string = '';
  showCalendar = false;
  viewDate: Date = new Date();

  subjectPrediction:any[] = [];
  topSubject:any;
  averageSubject:any;


weakSubject:any;
  toggleCalendar() {

  this.showCalendar =
    !this.showCalendar;

}
showProgressPopup = false;
toggleProgressPopup() {

  this.showProgressPopup =
    !this.showProgressPopup;

  console.log(
    this.showProgressPopup
  );

}
getPerformanceStatus() {

  if (this.predictedPerformance >= 80) {

    return "Excellent Consistency 🚀";

  }
  else if (
    this.predictedPerformance >= 60
  ) {
    return "Good Progress 🔥";
  }
  else {
    return "Needs Improvement 📚";
  }
}

getMotivation() {

  if (this.predictedPerformance >= 80) {

    return "You are performing excellently! 🚀";

  }

  else if (
    this.predictedPerformance >= 60
  ) {

    return "You are improving faster than last week! 🔥";

  }

  else {

    return "Keep learning daily and trust yourself 📚";

  }

}

speakPerformanceReport() {

  const userName =
    localStorage.getItem('userName');

  const message =

    `Welcome to your performance tracking ${userName}.

    Your current productivity is
    ${this.predictedPerformance} percent.

    You have
    ${this.completedTasks}
    completed tasks and
    ${this.pendingTasks}
    pending tasks.

    ${this.getSuggestions().join('. ')}

    ${this.getMotivation()}`;

  const speech =
    new SpeechSynthesisUtterance();

  speech.text = message;

  speech.volume = 1;

  speech.rate = 1;

  speech.pitch = 1;

  speech.lang = "en-US";
  window.speechSynthesis.speak(
    speech
  );
speech.onstart = () => {

  this.isSpeaking = true;

  this.cdr.detectChanges();

};

speech.onend = () => {

  this.isSpeaking = false;

  this.cdr.detectChanges();

};

speech.onerror = () => {

  this.isSpeaking = false;

  this.cdr.detectChanges();

};
}
getSuggestions() {

  const suggestions = [];

  // Pending tasks

  if (this.pendingTasks > 0) {

    suggestions.push(
      "Try to complete pending tasks earlier."
    );

  }

  // Hard tasks

  if (this.hardTasks > 0) {

    suggestions.push(
      "Focus more on hard tasks."
    );

  }

  // Performance based

  if (this.predictedPerformance < 60) {

    suggestions.push(
      "Maintain better consistency daily."
    );

  }

  // Default fallback

  if (suggestions.length === 0) {

    suggestions.push(
      "Excellent work! Keep going 🚀"
    );

  }

  return suggestions;

}

getAITasks() {

  const tasks = [];

  // LOW PERFORMANCE

  if (this.predictedPerformance < 50) {

    tasks.push({
      title: "Revise weak subjects",
      subject: "Study Improvement",
      status: "Important"
    });

    tasks.push({
      title: "Complete pending tasks",
      subject: "Productivity",
      status: "High Priority"
    });

  }

  // MEDIUM PERFORMANCE

  else if (
    this.predictedPerformance < 80
  ) {

    tasks.push({
      title: "Practice harder concepts",
      subject: "Skill Growth",
      status: "Recommended"
    });

    tasks.push({
      title: "Increase consistency",
      subject: "Daily Study",
      status: "Important"
    });

  }

  // HIGH PERFORMANCE

  else {

    tasks.push({
      title: "Start advanced AI project",
      subject: "Machine Learning",
      status: "Advanced"
    });

    tasks.push({
      title: "Build portfolio project",
      subject: "Career Growth",
      status: "Recommended"
    });

  }

  return tasks;

}

ngOnInit() {

  this.loadTasks();
  this.taskService.getStreak(localStorage.getItem('userId')!).subscribe((data: any) => {
    this.currentStreak = data.currentStreak;
  });

  console.log("✅ Progress page loaded");

  const userId =
    localStorage.getItem('userId');

  this.userName =
  localStorage.getItem('userName') || '';

  this.userEmail =
  localStorage.getItem('userEmail') || '';
  
  this.userInitial =
  this.userName.charAt(0).toUpperCase();

  this.predictionService
    .getPrediction(userId!)
    .subscribe((data: any) => {

      this.predictedPerformance =
        data.predicted_performance;

      this.completedTasks =
        data.completed_tasks;

      this.pendingTasks =
        data.pending_tasks;

      this.hardTasks =
        data.hard_tasks;

      console.log(data);
      setTimeout(() => {

  this.speakPerformanceReport();

}, 1500);
       this.cdr.detectChanges();
    });

this.taskService
.getSubjectPrediction()
.subscribe((data:any)=>{
this.subjectPrediction =

typeof data.result === 'string'

  ? JSON.parse(data.result)

  : data.result;

console.log(this.subjectPrediction);

// SORT DESCENDING

this.subjectPrediction.sort(

  (a:any, b:any)=>

    b.performance -
    a.performance

);

// STRONGEST SUBJECT

this.topSubject = {

  subject:
    this.subjectPrediction[0].subject,

  performance:
    this.subjectPrediction[0].performance

};

// WEAKEST SUBJECT

this.weakSubject = {

  subject:
    this.subjectPrediction[
      this.subjectPrediction.length - 1
    ].subject,

  performance:
    this.subjectPrediction[
      this.subjectPrediction.length - 1
    ].performance

};

// AVERAGE SUBJECT

let middleIndex = Math.floor(

  this.subjectPrediction.length / 2

);

this.averageSubject = {

  subject:
    this.subjectPrediction[
      middleIndex
    ].subject,

  performance:
    this.subjectPrediction[
      middleIndex
    ].performance

};

console.log(this.topSubject);

console.log(this.averageSubject);

console.log(this.weakSubject);
this.cdr.detectChanges();
});
    // recommendation tasks//
this.taskService
.getAIRecommendations()
.subscribe((data:any)=>{

  this.aiRecommendations =

    JSON.parse(data.result);

  console.log(
    this.aiRecommendations
  );
this.cdr.detectChanges();
});

}

  ngAfterViewInit() {
    this.loadChart();
  }

  loadChart() {

    // destroy old chart (important for refresh)
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("progressChart", {
      type: 'bar',
      data: {
        labels: ['Total', 'Completed', 'Pending'],
        datasets: [{
          label: 'Tasks',
          data: [this.total, this.completed, this.pending],
          backgroundColor: [
        '#4e73df', // Total (Blue)
        '#1cc88a', // Completed (Green)
        '#f6a21a'  // Pending (Orange)
      ],

      borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  loadTasks() {
const userId = localStorage.getItem('userId');

this.taskService
  .getTasks(userId!)
  .subscribe((res: any) => {
    this.tasks = res;

    this.total = this.tasks.length;
    this.completed = this.tasks.filter(t => t.status === 'Completed').length;
    this.pending = this.tasks.filter(t => t.status === 'Pending').length;

    this.percentage = this.total > 0 
      ? Math.round((this.completed / this.total) * 100) 
      : 0;

    this.cdr.detectChanges();

    // 🔥 IMPORTANT FIX
    setTimeout(() => {
      this.loadChart();
    }, 100);
  });
}

  markComplete(task: any) {
  task.status = "Completed";

  this.taskService.updateTask(task._id, task).subscribe(() => {
    this.loadTasks();
  });
}

deleteTask(id: string) {
  this.taskService.deleteTask(id).subscribe(() => {
    this.loadTasks();
  });
}

getSubjectStats() {
  const map: any = {};

  this.tasks.forEach(t => {
    if (!map[t.subject]) map[t.subject] = 0;
    if (t.status === "Completed") map[t.subject]++;
  });

  console.log("Subject Stats:", map);
}

predictedPerformance: number = 0;
completedTasks: number = 0;
pendingTasks: number = 0;
hardTasks: number = 0;

today = new Date();

nextTasks() {

  if (
    (this.currentPage + 1)
    * this.tasksPerPage
    < this.tasks.length
  ) {

    this.currentPage++;

  }

}

previousTasks() {

  if (this.currentPage > 0) {

    this.currentPage--;

  }

}

getPaginatedTasks() {

  const start =
    this.currentPage *
    this.tasksPerPage;

  const end =
    start +
    this.tasksPerPage;

  return this.tasks.slice(
    start,
    end
  );

}
getEndIndex() {

  return Math.min(

    (this.currentPage + 1)
    * this.tasksPerPage,

    this.tasks.length

  );

}

}
