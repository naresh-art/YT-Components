import { LightningElement,track,wire,api } from 'lwc';
import getAccountRelatedContacts from '@salesforce/apex/WireExampleClass.getAccountRelatedContacts';

export default class WireEaxmpleWithParameterData extends LightningElement {
    @api recordId;
    @track contactsData;

    @track columns=[
        {label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'},
        {label:'Phone', fieldName:'Phone', type:'phone'}
    ];

    @wire(getAccountRelatedContacts, {accountId:'$recordId'}) contactRecords({error,data}){
        console.log('RecordId::'+this.recordId);
        if(data){
            // alert(JSON.stringify(data));
            this.contactsData =data;
            console.log('Accounts Data::'+JSON.stringify(this.contactsData));
        } 
        else if(error){
            console.log('error::'+error);
            this.contactsData =undefined;
        }
    };

    
}