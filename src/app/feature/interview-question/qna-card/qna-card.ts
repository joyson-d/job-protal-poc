import { Component, Input, input } from '@angular/core';
import { InterviewQuestion } from '../../../core/interview-question/questions.model';

@Component({
  selector: 'app-qna-card',
  imports: [],
  templateUrl: './qna-card.html',
  styleUrl: './qna-card.css',
})
export class QnaCard {

   @Input({ required: true })
  question!:InterviewQuestion
}
