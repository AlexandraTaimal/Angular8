import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'https://angular-crud-c2b53.firebaseio.com';


  constructor( private http: HttpClient ) { }


  createUser( user: UserModel ) {

    return this.http.post(`${ this.url }/users.json`, user)
            .pipe(
              map( (resp: any) => {
                user.id = resp.name;
                return user;
              })
            );

  }

  updateUser( user: UserModel ) {

    const userTemp = {
      ...user
    };

    delete userTemp.id;

    return this.http.put(`${ this.url }/users/${ user.id }.json`, userTemp);


  }

  deleteUser( id: string ) {

    return this.http.delete(`${ this.url }/users/${ id }.json`);

  }


  getUser( id: string ) {

    return this.http.get(`${ this.url }/users/${ id }.json`);

  }


  getUsers() {
    return this.http.get(`${ this.url }/users.json`)
            .pipe(
              map( this.createArray ),
              delay(0)
            );
  }

  private createArray( usersObj: object ) {

    const users: UserModel[] = [];

    Object.keys( usersObj ).forEach( key => {

      const user: UserModel = usersObj[key];
      user.id = key;

      users.push( user );
    });


    return users;

  }


}
