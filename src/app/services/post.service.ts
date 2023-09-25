import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import Post from "../dto/Post";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    baseUrl = 'https://jsonplaceholder.typicode.com/';

    constructor(private http: HttpClient, private fireStoreService: AngularFirestore) {

    }

    /*findAll(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'posts');
    }*/
    findAllDataFireStore() {
        return this.fireStoreService.collection('post-data').snapshotChanges();
    }

    /* delete(id: any): Observable<any> {
       return this.http.delete<any>(this.baseUrl + 'posts/' + id);
     }*/

    deleteDataFireStore(id: any) {
        return this.fireStoreService.collection('post-data').doc(id).delete();
    }

    /* find(id: any): Observable<any> {
       return this.http.get<any>(this.baseUrl + 'posts?id=' + id);
     }*/

    findDataFireStore(id: any) {
        return this.fireStoreService.collection('post-data').doc(id).valueChanges();
    }

    /*  create(id:any, userId:any, title:any, body:any):Observable<any>{
        return this.http.post<any>(this.baseUrl+'posts',{
          id,userId,title,body
        });
      }*/

    createDataFireStore(post: Post) {
        console.log(post);
        return new Promise<any>((resolve, reject) => {
            this.fireStoreService.collection('post-data')
                .add(post)
                .then(response => {
                    console.log(response);
                }, error => {
                    console.log(error)
                });
        });
    }


    /*  update(id: any, userId: any, title: any, body: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + 'posts/' + id, {
          id, userId, title, body
        });
      }*/

    updateDataFireStore(post: Post) {
        return this.fireStoreService.collection('post-data')
            .doc(post.id)
            .update({
                userId: post.userId,
                title: post.title,
                body: post.body
            });
    }
}
