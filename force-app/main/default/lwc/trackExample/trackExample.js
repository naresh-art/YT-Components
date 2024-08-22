import { LightningElement, track} from 'lwc';

export default class TrackExample extends LightningElement {

    greetings;

    handleGreetingsChange(event){
        this.greetings =  event.target.value;
        console.log('Greetings Message:::'+this.greetings);
    }
}