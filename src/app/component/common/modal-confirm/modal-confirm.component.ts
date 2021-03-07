import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/*
@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
*/
@Component({
  template: `
    <div class="modal-header">
    <h4 class="modal-title">{{title}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('dissmiss')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>{{message}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="activeModal.close('ok')">{{okCaption}}</button>
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.dismiss('cancel')">{{cancelCaption}}</button>
  </div>
  `
  })

export class ModalConfirmComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() okCaption = 'OK';
  @Input() cancelCaption = 'Cancel';

  constructor(public activeModal: NgbActiveModal) { }
    ngOnInit(): void {
  }
}
