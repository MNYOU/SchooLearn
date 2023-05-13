import {Component, OnInit} from "@angular/core";
import {IQuestion, QuestionsService} from "./questions.service";

@Component({
  selector: "faq-accordion",
  templateUrl: "accordion.component.html",
  styleUrls: ["accordion.component.scss"],
  providers: [QuestionsService]
})
export class AccordionComponent implements OnInit{
  data: IQuestion[] = [];
  collapsing = false;
  constructor(private questionsService: QuestionsService){}
  ngOnInit() {
    this.data = this.questionsService.getQuestions()
    console.log(this.data)
  }
}
