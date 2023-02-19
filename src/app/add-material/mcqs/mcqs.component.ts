import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})
export class MCQSComponent implements OnInit {

  image: any
  public mcqsForm: FormGroup = new FormGroup({
    mcqs: new FormControl("", [
      Validators.required
    ]),
    option1: new FormControl("", [
      Validators.required
    ]),
    option2: new FormControl("", [
      Validators.required
    ]),
    option3: new FormControl("", [
      Validators.required
    ]),
    option4: new FormControl("", [
      Validators.required
    ]),
    answer: new FormControl("", [
      Validators.required
    ]),
    file: new FormControl("", [
    ]),
    posFeedback: new FormControl("", [
      Validators.required
    ]),
    negFeedback: new FormControl("", [
      Validators.required
    ]),
  })

  constructor(private questionService:
    QuestionsService, private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer, private topicService: TopicsService) { }
  mcqs: Array<any> = []
  topicId: any
  topic: any
  topicGetById: any
  typeId: any
  mcqImages: Array<any> = []
  imageBlobUrl: Array<any> = [];
  // imageBlobUrl : any
  // mcqImages: any

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getTopicById(this.topic)
      .subscribe(res => {
        this.topicGetById = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
    // localStorage.setItem('typeId', this.typeId)
    this.questionService.getMcqsByTopic(this.topic).subscribe(
      res => {
        console.log(res)
        this.imageBlobUrl = []
        this.mcqs = <any>res;
        this.mcqs.forEach(item => {
          this.getImage(item.image)
        })
      },
      err => {
        console.log(err)
      })
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
  // onSubmit() {
  //   this.typeId = this.route.snapshot.paramMap.get('id')
  //   this.topic = localStorage.getItem('topicId')
  //   console.log(this.mcqsForm.value)

  //   const formData = new FormData();
  //   formData.append('file', this.mcqsForm.get('file').value);
  //   this.questionService.addMcqs(this.mcqsForm.value, formData, this.topic, this.typeId)
  //     .subscribe(
  //       res => {
  //         this.mcqs.push(res);
  //         this._snackBar.open(" Your Question has been Posted", "Ok", {
  //           duration: 5000,
  //           panelClass: ['blue-snackbar']
  //         });
  //         this.mcqsForm.reset();
  //       },
  //       err => {
  //         console.log(err)
  //       });
  // }
  onSubmit() {
    // debugger
    if (this.mcqs.length >= this.topicGetById.noOfQuestions) {
      this._snackBar.open(" Your Limit has been execced", "Ok", {
        duration: 5000,
        panelClass: ['blue-snackbar']
      });
      return
    }
    this.topic = this.route.snapshot.paramMap.get('id')
    // this.topic = localStorage.getItem('topicId')
    this.mcqsForm.get('file')

    const formData = new FormData();
    formData.append('file', this.mcqsForm.get('file').value);
    console.log(this.mcqsForm.get('file').value);
    formData.append("mcqs", this.mcqsForm.get('mcqs').value)
    formData.append("option1", this.mcqsForm.get('option1').value)
    formData.append("option2", this.mcqsForm.get('option2').value)
    formData.append("option3", this.mcqsForm.get('option3').value)
    formData.append("option4", this.mcqsForm.get('option4').value)
    formData.append("answer", this.mcqsForm.get('answer').value)
    formData.append("posFeedback", this.mcqsForm.get('posFeedback').value)
    formData.append("negFeedback", this.mcqsForm.get('negFeedback').value)

    // debugger
    this.questionService.addMcqs(formData, this.topic)
      .subscribe(
        res => {
          // debugger
          // this.getImage(res._id)
          // this.mcqs.push(res);

          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          window.location.reload();

          this.mcqsForm.reset();
        },
        err => {
          console.log(err)
        });
  }
  getImage(id: string) {
    console.log(this.mcqsForm.get('file').value.name)
    this.questionService.getImageMcqs(id)
      .subscribe((blob: any) => {
        let objectURL = URL.createObjectURL(blob);
        this.imageBlobUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
        console.log(this.imageBlobUrl)
      })
  }
  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageBlobUrl = reader.result;
  //     this.imageBlobUrl = this.getSantizeUrl(this.imageBlobUrl)
  //     console.log(this.imageBlobUrl)
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }
  onDelete(id: any) {
    this.questionService.deleteMcqs(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
  processFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.mcqsForm.get('file').setValue(file);
    }
  }
}
