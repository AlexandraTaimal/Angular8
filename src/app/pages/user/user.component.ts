import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user: UserModel = new UserModel();
  
 
  constructor( private usersService: UsersService,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');

    if ( id  !== 'nuevo' ) {

      this.usersService.getUser( id )
        .subscribe( (resp: UserModel) => {
          this.user = resp;
          this.user.id = id;
        });

    }      
  }
  
  saveUser( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Invalid Form');
      return;
    }

    Swal.fire ({
      title: 'Wait',
      text: 'Saving information',
      type: 'info',
      timer: 1500,
      allowOutsideClick: false
    });
    
    Swal.showLoading();

    
    let peticion: Observable<any>;

    var tempName = this.user.names;

    if ( this.user.id ) {
      peticion = this.usersService.updateUser( this.user );
    } else {
      peticion = this.usersService.createUser( this.user );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: tempName,
        text: 'Updated successfully',
        type: 'success'
      });

    });

    //delete the form when you add a user
   // this.user = null;
    form.resetForm();

  
  }
   
}
