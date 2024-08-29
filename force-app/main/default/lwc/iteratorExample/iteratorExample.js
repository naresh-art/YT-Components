import { LightningElement,track,wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/WireExampleClass.getAllAccounts';

export default class IteratorExample extends LightningElement {
    @track accountsData;

    @wire(getAllAccounts) accountRecords({error,data}){
        if(data){
            this.accountsData =data;
            console.log('Accounts Data::'+JSON.stringify(this.accountsData));
        } 
        else if(error){
            console.log('error::'+error);
            this.accountsData =undefined;
        }
    };
}