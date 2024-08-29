import { LightningElement, track } from 'lwc';

export default class MultipleScreenExample extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;
    @track fourthScreen = false;

    handlefirstScreenNext(){
        this.secondScreen = true;
        this.firstScreen = false;
        this.thirdScreen = false;
        this.fourthScreen = false;
    }

    handleSecondScreenPrevious(){
        this.firstScreen = true;
        this.secondScreen = false;
        this.thirdScreen = false;
        this.fourthScreen = false;
    }
    handleSecondScreenNext(){
        this.thirdScreen = true;
        this.secondScreen = false;
        this.firstScreen = false;
        this.fourthScreen = false;
    }
    handleThirdScreenNext(){
        this.fourthScreen = true;
        this.secondScreen = false;
        this.firstScreen = false;
        this.thirdScreen = false;
    }
    handleThirdScreenPrevious(){
        this.secondScreen = true;
        this.firstScreen = false;
        this.thirdScreen = false;
        this.fourthScreen = false;
    }

    handleFourthScreenPrevious(){
        this.thirdScreen = true;
        this.firstScreen = false;
        this.secondScreen = false;
        this.fourthScreen = false;
    }
    handleFinalSubmit(){
        //Close logic
    }

}