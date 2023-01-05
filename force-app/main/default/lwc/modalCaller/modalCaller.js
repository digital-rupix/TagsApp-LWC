import { LightningElement, api } from 'lwc';
import dynamicModal from 'c/dynamicModal';
export default class ModalCaller extends LightningElement {
    @api recordId;

    async handleShowModal() {
        this.result = await dynamicModal.open({
            size: 'large',
            description: 'Add tags to this Record.',
            header: 'Add Tag Relationships',
            flowName: 'Add_Tags',
            inputVariables: this.inputVariables
        });
    }

    get inputVariables() {
        return [
           /*  {
                name: 'recordId',
                type: 'String',
                value: recordId
                } */
        ];
    }
}