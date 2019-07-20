import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private apiService: ApiService, private element: ElementRef) { }

  trivia: any;
  question: any;
  answers: string[];
  selected: number;
  currentQuestion: number = 0;
  shuffle: Function = (a: string[]) => {
    for (let i: number = a.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];

    }
    return a;
  };
  accuracy: number = 0;
  feedback: string;
  gameOver: boolean = false;
  submitted: boolean = false;
  roaming: boolean = false;
  answered: string[] = [];

  // addUser: FormGroup = new FormGroup({

  //   firstName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  //   lastname: new FormControl(null, [Validators.required]),
  //   email: new FormControl(null, [Validators.required]),
  //   age: new FormControl(null, [Validators.required]),
  //   companyId: new FormControl(null, [Validators.required]),
  // }
  // );

  submit() {
    // this.apiService.addUser(this.addUser.controls).subscribe(data=>{
    //   this.trivia.push(data)
    // })

    if (this.currentQuestion === this.trivia.length - 1 && this.submitted) {
      this.currentQuestion++
      this.gameOver = true;
      if (this.answers[this.selected - 1] === this.question.correct_answer) {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion - 1].style.background = "yellowgreen";
        }, 100);
      }
      else {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion - 1].style.background = "red";
        }, 100);
      }
      setTimeout(() => {
        this.feedback = null;
      }, 1000);

      return;
    }

    if (!this.submitted) {
      if (this.answers[this.selected - 1] === this.question.correct_answer) {
        this.element.nativeElement.querySelectorAll('.a')[this.selected - 1].style.background = "linear-gradient(45deg, greenyellow 60%, transparent 71%)";
        this.accuracy = this.accuracy + (1 / this.trivia.length) * 100;
        this.feedback = "GREAT";

      }
      else {
        debugger;
        this.element.nativeElement.querySelectorAll('.a')[this.selected - 1].style.background = "linear-gradient(45deg, #EE4550 60%, transparent 71%)";
        this.element.nativeElement.querySelectorAll('.a')[this.answers.findIndex(answer => answer === this.question.correct_answer)].style.background = "linear-gradient(45deg, yellowgreen 60%, transparent 71%)";
        this.accuracy = this.accuracy + (0 / this.trivia.length) * 100;
        this.feedback = "NOT GREAT";
      }
      this.answered.push(this.answers[this.selected - 1])
      this.element.nativeElement.querySelectorAll('.a').forEach(elem => {
        elem.style.pointerEvents = "none"
      })
    }

    if (this.submitted) {

      this.currentQuestion++
      this.question = this.trivia[this.currentQuestion];
      this.answers = this.trivia[this.currentQuestion].incorrect_answers;
      this.answers.push(this.trivia[this.currentQuestion].correct_answer);
      this.shuffle(this.answers);
      this.element.nativeElement.querySelector('.next').style.transform = "translateY(80px)";
      this.element.nativeElement.querySelector('.next').style.pointerEvents = "none";
      this.selected = 0;

      if (this.feedback === 'GREAT') {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion - 1].style.background = "yellowgreen";
        }, 100);
      }
      else {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion - 1].style.background = "red";
        }, 100);
      }

      setTimeout(() => {
        this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion - 1].style.cursor = "pointer"
      }, 100);
      this.feedback = null;
      return this.submitted = false;

    }

    this.submitted = true
  }

  markSelection(ev) {
    if (this.selected !== parseInt(ev.target.innerText[0])) {
      this.element.nativeElement.querySelectorAll('.a').forEach(element => {
        element.style.background = "linear-gradient(45deg, lightblue 60%, transparent 71%)";
        this.element.nativeElement.querySelector('.next').style.transform = "translateY(80px)";
        this.element.nativeElement.querySelector('.next').style.pointerEvents = "none";
      });
      ev.target.style.background = "linear-gradient(45deg, cyan 60%, blue 75%, transparent 100%)";
      this.selected = parseInt(ev.target.innerText[0]);
      this.element.nativeElement.querySelector('.next').style.transform = "translateY(0px)";
      this.element.nativeElement.querySelector('.next').style.pointerEvents = "all";

    }
    else {
      this.selected = null;
      ev.target.style.background = "linear-gradient(45deg, lightblue 60%, transparent 71%)";
      this.element.nativeElement.querySelector('.next').style.transform = "translateY(80px)";
      this.element.nativeElement.querySelector('.next').style.pointerEvents = "none";
    }
  }

  replay() {
    this.selected = null;
    this.currentQuestion = 0;
    this.accuracy = 0;
    this.feedback = null;
    this.gameOver = false;
    this.submitted = false;
    this.ngOnInit();
  }

  chooseAnswered(ev) {
    if (parseInt(ev.target.innerText) - 1 <= this.currentQuestion) {
      this.roaming = true;
      this.answers = [];
      this.question = this.trivia[parseInt(ev.target.innerText) - 1]
      for (let i: number = 0; i < 4; i++) {
        this.answers.push(this.trivia[parseInt(ev.target.innerText) - 1].incorrect_answers[i])
      };
      this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion].style.cursor = "pointer";
    }

    if (parseInt(ev.target.innerText) - 1 < this.currentQuestion) {
      // this.answers.push(this.trivia[parseInt(ev.target.innerText) - 1].correct_answer)
      this.selected = null;

      let userAnswerIndex = this.answers.findIndex((ans) => ans === this.answered[parseInt(ev.target.innerText) - 1])

      let userAnswer = this.answers.find((ans) => ans === this.answered[parseInt(ev.target.innerText) - 1])

      if (this.question.correct_answer === userAnswer) {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.a')[userAnswerIndex].style.background = "linear-gradient(45deg, greenyellow 60%, transparent 71%)";
        }, 100);
      }
      else {
        setTimeout(() => {
          this.element.nativeElement.querySelectorAll('.a')[userAnswerIndex].style.background = "linear-gradient(45deg, #EE4550 60%, transparent 71%)";

          this.element.nativeElement.querySelectorAll('.a')[this.answers.findIndex((ans) => ans === this.question.correct_answer)].style.background = "linear-gradient(45deg, greenyellow 60%, transparent 71%)";
        }, 100);
      }
      setTimeout(() => {
        this.element.nativeElement.querySelectorAll('.a').forEach(elem => {
          elem.style.pointerEvents = "none"
        })
      }, 100);
    }
    if (parseInt(ev.target.innerText) - 1 === this.currentQuestion) {
      this.element.nativeElement.querySelectorAll('.stage')[this.currentQuestion].style.cursor = "context-menu";
      this.roaming = false;
    }

  }

  ngOnInit() {
    this.apiService.getData().subscribe(data => {
      this.trivia = data.results;
      this.question = data.results[this.currentQuestion];
      this.answers = data.results[this.currentQuestion].incorrect_answers;
      this.answers.push(data.results[this.currentQuestion].correct_answer);
      this.shuffle(this.answers);
    })
  }

}
