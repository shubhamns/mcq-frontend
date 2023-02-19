import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicsService } from 'src/app/service/topics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
  public topicForm: FormGroup = new FormGroup({
    topic: new FormControl("", [
      Validators.required, Validators.maxLength(50)
    ]),
    ageGroup: new FormControl("", [
      Validators.required
    ]),
    language: new FormControl("", [
      Validators.required
    ]),
    country: new FormControl("", [
      Validators.required
    ]),
    grade: new FormControl("", [
      Validators.required
    ]),
    type: new FormControl("", [
      Validators.required
    ]),
    // access: new FormControl("", [
    //   Validators.required
    // ]),
    noOfQuestions: new FormControl("", [
      Validators.required
    ]),
    time: new FormControl("", [
      Validators.required
    ])
  });

  public searchForm: FormGroup = new FormGroup({
    search: new FormControl("", [
      Validators.required
    ])
  });
  // routes = ['/material/mcqs/', this.topics._id]

  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar, private route: ActivatedRoute,
    private activityService: ActivityFormService) { }
  topic: Array<any> = []
  searchText = ''
  subject: any
  subId: any
  ageId: any
  selectedAge: string = '';

  age: any = []
  language: any = []
  country: any = []
  grade: any = []
  type: any = []

  ngOnInit(): void {
    this.subject = this.route.snapshot.paramMap.get('id');
    // this.subId = this.route.snapshot.paramMap.get('id')
    // localStorage.setItem('subId', this.subId)
    this.topicService.getTopicBySubject(this.subject)
      .subscribe(res => {
        this.topic = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })

    this.activityService.getGeGroup()
      .subscribe(data => {
        this.age = data
        console.log(data)
      })

    this.activityService.getAllLanguage()
      .subscribe(langData => {
        this.language = langData;
        console.log(langData)
      })

    this.activityService.getCountry()
      .subscribe(countryData => {
        this.country = countryData;
        console.log(countryData)
      })

    this.activityService.getGrade()
      .subscribe(gradeData => {
        this.grade = gradeData;
        console.log(gradeData)
      })

    this.activityService.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData;
        console.log(typeData)
      })
  }

  onSubmit() {
    console.log(this.topicForm.value)
    // debugger
    this.subId = this.route.snapshot.paramMap.get('id');
    // debugger
    this.topicService.addTopic(this.topicForm.value, this.subId, this.topicForm.value.ageGroup)
      .subscribe(res => {
        window.location.reload();
        this.snackbar.open('Your topic has been posted', 'Ok', {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.getTopicByAgeId(this.topicForm.value.ageGroup);
        this.topicForm.reset();
      })
  }
  getTopicByAgeId(ageId: string) {
    this.subId = this.route.snapshot.paramMap.get('id');

    this.topicService.getTopicByAgeId(this.subId, ageId)
      .subscribe(res => {

      })
  }

  topics: any = []
  searchData(event: Event) {
    var text = (event.target as HTMLInputElement).value;
    this.topics = this.topic.filter(x => {
      return (x.topic.toLowerCase()).includes(text.toLowerCase());
    })
  }

  onDelete(id: any) {
    this.topicService.deleteTopic(id).subscribe(
      res => {
        this.ngOnInit();
        this.snackbar.open(" Your Topic has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
}
