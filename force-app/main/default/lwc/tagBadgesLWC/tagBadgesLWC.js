import { LightningElement, api, track, wire } from "lwc";
import getTagRelationships from '@salesforce/apex/TagRelationshipSerializer.getTagRelationships';

export default class TagBadges extends LightningElement {
  @api recordId;
  @track tags = [];
  @track tagRelationships;
  @api object;
  
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
        value: this.object
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
}
