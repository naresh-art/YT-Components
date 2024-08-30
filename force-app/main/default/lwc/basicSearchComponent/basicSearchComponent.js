import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/SearchComponentCls.getAccounts';
// const DELAY = 300; //it shows delay
export default class BasicSearchComponent extends LightningElement {
    accountName='';
    @track accountList = [];

    @wire(getAccounts, { actName: '$accountName' })
    retriveAccounts({ error, data }) {
        if (data) {
            this.accountList = data;
        } else if (error) {
            this.accountList = undefined;
        }
    }

    handleKeyChange(event){
        this.accountName = event.target.value;
        // const searchString = event.target.value;
        // window.clearTimeout(this.delayTimeout);
        // this.delayTimeout = setTimeout(() => {
        //     this.accountName = searchString;
        // }, DELAY)
    }
}