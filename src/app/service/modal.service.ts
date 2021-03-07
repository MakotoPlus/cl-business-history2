import { Injectable, Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent} from './../component/common/modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  constructor(private modalService: NgbModal) { }

  confirm(title: string, message: string, okCaption?: string, cancelCaption?: string): Promise<boolean> {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    const component = modalRef.componentInstance as ModalConfirmComponent;
    if (component != null) {
      component.title = title;
      component.message = message;
      component.okCaption = okCaption || 'OK';
      component.cancelCaption = cancelCaption || 'Cancel';
    }

    return modalRef.result.then(result => {
      return true;  // はい を押したらこっち
    }, reason => {
      return false; // いいえ や x でダイアログを閉じたらこっち
    });
  }
}
