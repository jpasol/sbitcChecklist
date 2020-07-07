import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/shared/models/question';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
  selector: 'app-tractor',
  templateUrl: './tractor.component.html',
  styleUrls: ['./tractor.component.css']
})
export class TractorComponent implements OnInit {

  private logo = require("../check.png")
  private isSubmitted : boolean = false;

  questions: Question[] = new Array();
  eqType: string;
  constructor(private questionService: QuestionService,
    private auth: AuthService,
    private checklistService: ChecklistService) {
      this.auth.currentEquipment.subscribe( x => this.eqType = x.equipment_TypeID) //get equipmentType in authService

   }

  ngOnInit() {
    this.questionService.getQuestions(this.eqType)
    .subscribe(data => {
      this.questions = data.sort((a,b) => 
        a['rank'] > b['rank'] ? 1 : a['rank'] === b['rank'] ? 0 : -1) //sorting function
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    this.checklistService.submitChecklist();
  }

}
