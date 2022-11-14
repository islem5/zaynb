import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Fournisseur} from '../shared/Model/Fournisseur';
import {FournisseurService} from '../shared/Service/Fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  listSec: any;
  form: boolean = false;
  sec!: Fournisseur;
  closeResult!: string;

  constructor(private fournisseurService: FournisseurService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllSec();
    this.sec = {
      idFournisseur:null,
      code:null,
      libelle:null
    }
  }

  getAllSec() {
    this.fournisseurService.getAllFournisseurs().subscribe(res => this.listSec = res)
  }

  addSec(p: any) {
    this.fournisseurService.addFournisseur(p).subscribe(() => {
      this.getAllSec();
      this.form = false;
    });
  }

  editSec(sec: Fournisseur) {
    this.fournisseurService.editFournisseur(sec).subscribe();
  }

  deleteSec(idSec: any) {
    this.fournisseurService.deleteFournisseur(idSec).subscribe(() => this.getAllSec())
  }

  open(content: any, action: any) {
    if (action != null)
      this.sec = action
    else
      this.sec = new Fournisseur();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}
