import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-washerlogin',
  templateUrl: './washerlogin.component.html',
  styleUrls: ['./washerlogin.component.css']
})
export class WasherloginComponent implements OnInit {
  constructor(private service:AuthenticationService, private route:Router, private router: ActivatedRoute){

  }
  faReg = faAddressBook;
washer:any={
username:'',
password:''
}
username: string = '';
errorMessage: string = '';

ngOnInit(): void {
  
}
loginWasher(){
  this.service.loginWasher(this.washer).subscribe((data:any)=>{
    localStorage.setItem('token', data.jwt)
    localStorage.setItem('username',this.washer.username) //new line 

    console.log(data);
    this.route.navigate(['washer'])
    // this.route.navigate(['user',this.user.username]);
  },
  (err: { status: number; errorMessage: string; }) => {
    if (err?.status === 403) {
      this.errorMessage = 'In Valid Credentials';
    } else {
      this.errorMessage =
        'Unexpected error occurred. Error is: ' + err?.errorMessage;
      console.log(err);
    }
  }
 
 
  )
}

}
