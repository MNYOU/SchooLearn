import { Component } from "@angular/core";

@Component({
  selector: "faq",
  templateUrl: "FAQ.page.web.html",
  styleUrls: ["FAQ.page.web.scss"]
})
export class FAQPageWeb{
  open: number = 0;

  openQuestion(idQuestion: number) {
    if(this.open !== idQuestion) {
      this.open = idQuestion;
    }
    else {
      this.open = 0;
    }
  }
}
