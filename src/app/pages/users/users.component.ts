import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserModel[] = [];
  loanding = false;


  constructor( private usersService: UsersService ) { }

  ngOnInit() {

    this.loanding = true;
    this.usersService.getUsers()
      .subscribe( resp => {
        this.users = resp;
        this.loanding = false;
      });

  }

  deleteUser( users: UserModel, i: number ) {

    Swal.fire({
      title: '¿Are you sure?',
      text: `Are you sure you want to delete ${ users.names }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.users.splice(i, 1);
        this.usersService.deleteUser( users.id ).subscribe();
      }

    });

  }

}
