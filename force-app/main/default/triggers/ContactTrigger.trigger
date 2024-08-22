trigger ContactTrigger on Contact (After insert) {
    if(trigger.isInsert && Trigger.isAfter){
        SendEmailToObjectHandler.sendEmail(Trigger.New);
    }
}