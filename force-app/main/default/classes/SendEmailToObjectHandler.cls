public class SendEmailToObjectHandler {
    public static void sendEmail(List<Contact> ConList){
        //Initialize Email Object
        List<Messaging.Email> emailList = new List<Messaging.Email>();
        
        for(Contact con: ConList){
            if(con.Email != null){
                Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();
                String[] toAddress = new String[]{con.Email,'tejaswaroop373@gmail.com'};
                emailMessage.setToAddresses(toAddress);
                String emailSub = 'Welcome ' + con.LastName;
                emailMessage.setSubject(emailSub);
                
                String Content = 'Hi ' + con.LastName + ',<br/><br/>' +
                                'Welcome to Salesforce Contact Member <br/><br/>' +
                                'Learn Salesforce <br/><br/>' +
                                'Thank You! <br/><br/>';
                emailMessage.setHtmlBody(Content);
                emailList.add(emailMessage);
            }
        }
        Messaging.sendEmail(emailList);
    }
}