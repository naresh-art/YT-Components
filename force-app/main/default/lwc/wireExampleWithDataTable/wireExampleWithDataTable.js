import { LightningElement,track,wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/WireExampleClass.getAllAccounts';

export default class WireExampleWithDataTable extends LightningElement {
    @track accountsData;

    @track columns=[
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Rating', fieldName:'Rating', type:'text'}
    ];

    @wire(getAllAccounts) accountRecords({error,data}){
        if(data){
            // alert(JSON.stringify(data));
            this.accountsData =data;
            console.log('Accounts Data::'+JSON.stringify(this.accountsData));
        } 
        else if(error){
            console.log('error::'+error);
            this.accountsData =undefined;
        }
    };
}