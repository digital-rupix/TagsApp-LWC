/**
 * @description       : 
 * @author            : Marc Swan
 * @group             : 
 * @last modified on  : 01-06-2023
 * @last modified by  : Marc Swan
 * Modifications Log
 * Ver   Date         Author      Modification
 * 1.0   01-06-2023   Marc Swan   Initial Version
**/
import { LightningElement, api, track, wire } from "lwc";
import getTagRelationships from '@salesforce/apex/TagRelationshipSerializer.getTagRelationships';
export default class TagBadges extends LightningElement {
  @api recordId;
  @track tags = [];
  @track tagRelationships;
  @api object;
  @api objectApiName;

  columns = [
    {
        label: 'Checkbox button',
        fieldName: 'checkboxButton',
        type: 'checkbox-button',
        typeAttributes: {
            disabled: { fieldName: 'checkboxButtonDisabled' },
            label: 'Checkbox'
        },
        editable: true
    },
    {
        label: 'Color Picker',
        fieldName: 'colorPicker',
        type: 'color-picker',
        typeAttributes: {
            colors: [
                '#00a1e0',
                '#16325c',
                '#76ded9',
                '#08a69e',
                '#e2ce7d',
                '#e69f00'
            ],
            disabled: { fieldName: 'colorPickerDisabled' },
            label: 'Pick a color',
            opacity: true
        },
        fixedWidth: 250,
        editable: true
    },
    {
        label: 'Combobox',
        fieldName: 'combobox',
        type: 'combobox',
        typeAttributes: {
            label: 'Simple Combobox',
            options: { fieldName: 'options' },
            isMultiSelect: { fieldName: 'isMultiSelect' }
        },
        editable: true
    },
    {
        label: 'Currency',
        fieldName: 'currency',
        type: 'currency',
        typeAttributes: {
            currencyCode: 'CAD'
        },
        editable: true
    },
    {
        label: 'Counter',
        fieldName: 'counter',
        type: 'counter',
        typeAttributes: {
            disabled: { fieldName: 'counterDisabled' },
            label: 'Counter',
            step: { fieldName: 'counterStep' }
        },
        editable: true,
        cellAttributes: {
            alignment: 'center'
        }
    }
];
  
  @wire(getTagRelationships, { recordId: '$recordId' })
  wiredRecord({ error, data }) {
    if (error) {
      console.error(error);
    } else if (data) {
      this.tagRelationships = data;
      this.tags = this.tagRelationships.map((tr) => ({
        name: tr.Tag,
        url: this.generateUrl(tr.Category, tr.Tag, tr.Color)
      }));
    }
  }
  
  generateUrl(category, tag, color) {
    return `https://img.shields.io/badge/${category}-${tag}-${color}`;
  }

  get flowName() {
    flowname = 'Add_Tags';
  }
  
  get inputVariables() {
    return [
      {
        name: 'recordId',
        type: 'String',
        value: this.recordId
      },
      {
        name: 'objectName',
        type: 'String',
        value: this.objectApiName
      } 
    ];
  }
  
  //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
  @track isModalOpen = false;
  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }

  handleStatusChange(event) {
    if (event.detail.status === 'FINISHED') {
      console.log('handleStatusChange', event.detail);
      this.isModalOpen = false;
      window.location.reload();
    } 
  }

  openDialog() {
    const dialog = this.template.querySelector('avonni-dialog');
    dialog.show();
}
}
