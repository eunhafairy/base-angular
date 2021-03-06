import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],

})

export class SignInComponent implements OnInit {
isLoading = false;
hidePass = true;

  constructor(private userService : UserService, private router: Router) { }
  ngOnInit(): void {}

  signIn(form: NgForm){

    if(form.invalid){
      return;
    }
    this.isLoading=true;
    this.userService.loginUser(form.value.email, form.value.password)
    .subscribe(response =>{

      console.log(response);
      this.isLoading=false;
    },
    error =>{

      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Error! ' +error.error['message'],
        allowOutsideClick: false
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.isLoading=false;
        }
      });



    });


  }
}
