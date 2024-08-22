@isTest
public class SendEmailToObjectHandlerTest {
    @isTest
    static void sendEmailMethod(){
        List<Contact> conList = new List<Contact>();
        Contact con = new Contact();
        con.LastName='Mahesh';
        con.Email='abc@test.com';
        conList.add(con);
        insert conList;
        
        Test.startTest();
        SendEmailToObjectHandler.sendEmail(conList);
        Test.StopTest();
        
    }
     @isTest
    static void accountBeforeInsertMethod(){
        List<Account> accList = new List<Account>();
        Account acc = new Account();
        acc.name='Rajesh';
        accList.add(acc);
        insert accList;
        
        Test.startTest();
        AccountTriggerExampleHandler.insertAccount(accList);
        AccountTriggerExampleHandler.insertAccountOpp(accList);
        Test.StopTest();
        List<Account> acc1  = [select id,Name,Description from Account];
        System.assertEquals(1,acc1.size());
        
    }
}