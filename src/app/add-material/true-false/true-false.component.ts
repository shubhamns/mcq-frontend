import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss']
})
export class TrueFalseComponent implements OnInit {
  public trueFalseForm: FormGroup = new FormGroup({
    question: new FormControl("", [
      Validators.required
    ]),
    answer: new FormControl("", [
      Validators.required
    ])
  })

  constructor(private questionService: QuestionsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private topicService: TopicsService ) { }
  trueFalse: Array<any> = []
  topicId: any
  topicGetById: any
  ngOnInit(): void {
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.topicService.getTopicById(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.questionService.getTrueFalseByTopic(this.topicId)
      .subscribe(res => {
        this.trueFalse = <any>res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
  }
  onSubmit() {
    if (this.trueFalse.length >= this.topicGetById.noOfQuestions) {
      this._snackBar.open(" Your Limit has been execced", "Ok", {
        duration: 5000,
        panelClass: ['blue-snackbar']
      });
      return
    }
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.questionService.addTrueFalse(this.trueFalseForm.value, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload();

        this.trueFalseForm.reset();
      },
        err => {
          console.log(err)
        });
  }
  onDelete(id: any) {
    this.questionService.deleteTrueFalse(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
}
