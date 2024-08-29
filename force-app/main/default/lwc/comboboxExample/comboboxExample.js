import { LightningElement } from 'lwc';

export default class ComboboxExample extends LightningElement {
    //value = 'inProgress';
    value ='';
    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}
