import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss']
})
export class ScienceComponent implements OnInit {

  constructor(private category: ActivityFormService,
    private route: ActivatedRoute) { }
  type: any = []
  topicId: any
  ngOnInit(): void {
    this.topicId =  this.route.snapshot.paramMap.get('id');
    localStorage.setItem( 'topicId', this.topicId);
    console.log(localStorage.getItem('topicId'))
    // debugger

    this.category.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData
        console.log(typeData)
      })
  }
}

