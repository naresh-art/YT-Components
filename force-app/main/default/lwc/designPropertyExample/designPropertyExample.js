import { LightningElement, track,api } from 'lwc';
import getAccountRelatedContacts from '@salesforce/apex/WireExampleClass.getAccountRelatedContacts';

export default class DesignPropertyExample extends LightningElement {

    @api recordId;
    @track contactsData;

    @api tableHeadertitle;
    @api tableHeader;

    @track columns=[
        {label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'},
        {label:'Phone', fieldName:'Phone', type:'phone'}
    ];
    connectedCallback(){
        console.log('Welcome Connected call back');
        this.handleContactsData();
    }

    handleContactsData(){
        console.log('Welcome Imparative method');
        getAccountRelatedContacts({accountId:this.recordId})
        .then(result=>{
            this.contactsData =result;
            console.log('Contacts Imparative Data::'+JSON.stringify(this.contactsData));
        })
        .catch(error =>{
            this.error =error;
            console.log('error::'+JSON.stringify(this.error));
        });
    }

}