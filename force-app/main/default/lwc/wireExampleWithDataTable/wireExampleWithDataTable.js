import { LightningElement,track,wire,api } from 'lwc';
import getAllAccounts from '@salesforce/apex/WireExampleClass.getAllAccounts';
// import getAllContacts from '@salesforce/apex/WireExampleClass.getAllContacts';
//import getAccountRelatedContacts from '@salesforce/apex/WireExampleClass.getAccountRelatedContacts';

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

    // @track contactsData;

    // @track columns=[
    //     {label:'First Name', fieldName:'FirstName', type:'text'},
    //     {label:'Last Name', fieldName:'LastName', type:'text'},
    //     {label:'Phone', fieldName:'Phone', type:'phone'}
    // ];

    // @wire(getAllContacts) contactRecords({error,data}){
    //     if(data){
    //         // alert(JSON.stringify(data));
    //         this.contactsData =data;
    //         console.log('Accounts Data::'+JSON.stringify(this.contactsData));
    //     } 
    //     else if(error){
    //         console.log('error::'+error);
    //         this.contactsData =undefined;
    //     }
    // };


    // @api recordId;
    // @track contactsData;

    // @track columns=[
    //     {label:'First Name', fieldName:'FirstName', type:'text'},
    //     {label:'Last Name', fieldName:'LastName', type:'text'},
    //     {label:'Phone', fieldName:'Phone', type:'phone'}
    // ];

    // @wire(getAccountRelatedContacts, {accountId:'$recordId'}) contactRecords({error,data}){
    //     console.log('RecordId::'+this.recordId);
    //     if(data){
    //         // alert(JSON.stringify(data));
    //         this.contactsData =data;
    //         console.log('Accounts Data::'+JSON.stringify(this.contactsData));
    //     } 
    //     else if(error){
    //         console.log('error::'+error);
    //         this.contactsData =undefined;
    //     }
    // };




    // @api recordId;
    // @track contactsData;

    // @track columns=[
    //     {label:'First Name', fieldName:'FirstName', type:'text'},
    //     {label:'Last Name', fieldName:'LastName', type:'text'},
    //     {label:'Phone', fieldName:'Phone', type:'phone'}
    // ];
    // connectedCallback(){
    //     console.log('Welcome Connected call back');
    //     this.handleContactsData();
    // }

    // handleContactsData(){
    //     console.log('Welcome Imparative method');
    //     getAccountRelatedContacts({accountId:this.recordId})
    //     .then(result=>{
    //         this.contactsData =result;
    //         console.log('Contacts Imparative Data::'+JSON.stringify(this.contactsData));
    //     })
    //     .catch(error =>{
    //         this.error =error;
    //         console.log('error::'+JSON.stringify(this.error));
    //     });
    // }
    
}