trigger AccountTriggerExample on Account (before insert, after insert, before update, after update, before delete) {
	
    if(Trigger.isInsert && Trigger.isBefore){
        System.debug('Trigger before insert event');
        AccountTriggerExampleHandler.insertAccount(Trigger.New);
    }
    else if(Trigger.isInsert && Trigger.isAfter){
        System.debug('Trigger After insert event');
        AccountTriggerExampleHandler.insertAccountOpp(Trigger.New);
    } 
    
    /*if(Trigger.isUpdate && Trigger.isBefore){
        System.debug('Trigger before insert event');
        AccountTriggerExampleHandler.beforeUpdateExample(Trigger.New, Trigger.oldMap);
    } 
    else if(Trigger.isUpdate && Trigger.isAfter){
        System.debug('Trigger before insert event');
        AccountTriggerExampleHandler.afterUpdateExample(Trigger.New, Trigger.oldMap);
    }*/ 
    
    /*if(Trigger.isDelete && Trigger.isBefore){
        System.debug('Trigger before Delete event');
        AccountTriggerExampleHandler.beforeDeleteExample(Trigger.New);
    } */
}