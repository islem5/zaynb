import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  readonly API_URL = 'http://192.168.1.100:8089/SpringMVC/fournisseur';

  constructor(private httpClient: HttpClient) { }

  getAllFournisseurs() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-fournisseurs`)
  }
  addFournisseur(fournisseur : any) {
    return this.httpClient.post(`${this.API_URL}/add-Fournisseur`, fournisseur)
  }
  editFournisseur(fournisseur : any){
    return this.httpClient.put(`${this.API_URL}/modify-fournisseur`, fournisseur)
  }
  deleteFournisseur(idFournisseur : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-fournisseur/${idFournisseur}`)
  }
}
