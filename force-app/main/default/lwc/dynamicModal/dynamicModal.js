import { api } from 'lwc';
import LightningModal from 'lightning/modal';
export default class DynamicModal extends LightningModal {
    @api header;
    @api flowName;
    @api inputVariables;

    handleStatusChange(event) {
        console.log('handleStatusChange', event.detail);
    }

    handleClose() {
        this.close('return value');
    }
}