import { LightningElement,api, track} from 'lwc';

export default class ApiExample extends LightningElement {
    @track title='Welcome to Api decorator';
    @api recordId;
}