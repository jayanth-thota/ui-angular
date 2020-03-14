import { Component, OnInit } from '@angular/core';
import {UserService}from '../user.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  selectedFiles: FileList;

  constructor(private router: Router,private userservice:UserService) { }
  
  user:User=new User;
  submitted=false;
  message: String="Sign-up";
  
  ngOnInit() {
    
    var userid = window.localStorage.getItem("edit-id");



    if (userid != null && userid != "") {
      //this.message="Update Record";

      this.message = "Update Recored";



      this.userservice.find(parseInt(userid))



        .subscribe(data => {

          this.user = data; this.usersaveform.setValue(this.user)


        });



    }

    this.submitted=false;
  }
  selectFile(event) {  
    const file = event.target.files.item(0);  
   
    if (file.type.match('image.*')) {  
      var size = event.target.files[0].size;  
      if(size > 1000000)  
      {  
          alert("size must not exceeds 1 MB");  
          this.usersaveform.get('profileImage').setValue("");  
      }  
      else  
      {  
        this.selectedFiles = event.target.files;  
      }  
    } else {  
      alert('invalid format!');  
    }  
  
  }     
  usersaveform=new FormGroup({

    id:new FormControl('',[Validators.required, Validators.minLength(1)]),
  
    userName:new FormControl('',[Validators.required, Validators.minLength(1)]),
  
    password:new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  
    email:new FormControl('',[Validators.required, Validators.email]),
  
    contact:new FormControl('',[Validators.required,Validators.maxLength(10)]),

    profileImage:new FormControl( ),
  
   userType:new FormControl(),
  
  confirmed:new FormControl()
  
   })
  
   saveUser(saveUser){
     
  
    this.user=new User();
  
    this.user.id=this.usersaveform.get('id').value;
  
    this.user.userName=this.usersaveform.get('userName').value;
  
    this.user.password=this.usersaveform.get('password').value;
  
    this.user.email=this.usersaveform.get('email').value;
  
    this.user.contact=this.usersaveform.get('contact').value;

    this.user.profileImage=this.usersaveform.get('profileImage').value;
  
    this.user.userType='user';
  
    this.user.confirmed='no';
  
    this.submitted=true;
  
    this.save();
  
   
  }
  
   save(){
  
    this.userservice.saveUser(this.user).subscribe(data=>console.log(data), error=>console.log(console.error()));
  
    this.user=new User();
    window.localStorage.removeItem("edit-id");

    alert("registered successfully")
   
    this.router.navigate(['userlist']);
   }
   usersaveForm()
{
  this.submitted=false;
  this.usersaveform.reset();
}


}
