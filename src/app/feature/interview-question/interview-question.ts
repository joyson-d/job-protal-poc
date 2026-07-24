import { Component, inject } from '@angular/core';
import { InterviewQuestionService } from '../../core/interview-question/interview-question-service';
import { TranslatePipe } from '@ngx-translate/core';
import { QnaCard } from './qna-card/qna-card';

@Component({
  selector: 'app-interview-question',
  imports: [TranslatePipe,QnaCard],
  templateUrl: './interview-question.html',
  styleUrl: './interview-question.css',
})
export class InterviewQuestion {

   private readonly interviewService = inject(InterviewQuestionService);

  readonly questions = this.interviewService.questions;

}
