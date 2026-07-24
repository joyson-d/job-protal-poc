import { Injectable, signal } from '@angular/core';
import { InterviewQuestion } from './questions.model';
import questions from "../../../assets/i18n/questions/interview.json"

@Injectable({
  providedIn: 'root',
})
export class InterviewQuestionService {
  readonly questions = signal<InterviewQuestion[]>(questions);
}
