import { LightningElement,track,wire,api } from 'lwc';
import getAllContacts from '@salesforce/apex/WireExampleClass.getAllContacts';

export default class DataTableWithAllContactRecords extends LightningElement {

    @track contactsData;

    @track columns=[
        {label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'},
        {label:'Phone', fieldName:'Phone', type:'phone'}
    ];

    @wire(getAllContacts) contactRecords({error,data}){
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