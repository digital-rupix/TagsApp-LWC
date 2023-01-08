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
import getAllTagRelationships from '@salesforce/apex/TagRelationshipSerializer.getAllTagRelationships';
import findMatchingRelationships from '@salesforce/apex/FindMatchingTagRelationships.findMatchingRelationships';
export default class TagBadges extends LightningElement {
  @api recordId;
  @track tags = [];
  @track tagRelationships;
  @track tagsAll = [];
  @track tagAllRelationships;
  @api object;
  @api objectApiName;
  //@track tagId;
  @api tagId;
  @api records;
  @track datatableView = false;
  @track viewAll = false;
  
  columns = [
    {
      label: 'Name',
      fieldName: 'recordLink',
      type: 'url',
      typeAttributes: {
        label: { fieldName: 'urlLabel' },
        target: '_blank'
    }
    },
    {
      label: 'Record Type',
      fieldName: 'objectName',
      type: 'text'
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
        id: tr.Id,
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
  
  openDialog(event) {
    const dialog = this.template.querySelector('c-avonni-dialog');
    console.log(JSON.stringify({ ...event.currentTarget.dataset }));
    const tagId = event.currentTarget.dataset.id;
    findMatchingRelationships({ tagId: tagId })
    .then(result => {
      this.records = result;
      this.error = null;
      this.datatableView = true;
      console.log('records:', this.records);
    })
    .catch(error => {
      this.error = error;
      this.records = null;
      //console.log("errors", this.error);
    });
    
    dialog.show();
    
  }

  handleViewAll(event) {
    getAllTagRelationships({ recordId: '$recordId' })
    if (error) {
      console.error(error);
    } else if (data) {
      this.tagAllRelationships = data;
      this.tagsAll = this.tagAllRelationships.map((tr) => ({
        name: tr.Tag,
        id: tr.Id,
        url: this.generateUrl(tr.Category, tr.Tag, tr.Color)
      }));
    }
    
    dialog.show();
    
  }
}
