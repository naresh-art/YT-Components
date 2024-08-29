public with sharing class CustomLookupCntrl {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        List<Account> accountList = new List<Account>();
        if(actName!=''){
            String accountName = '%' + actName + '%';
            accountList = [select id,name from Account where name like:accountName];
            return accountList;  
        }
        return accountList;
              
    }
     
    @AuraEnabled
    public static Id createContact(String lastName, String phone, Id accountId) {
        try {
            Contact newContact = new Contact(
                LastName = lastName,
                Phone = phone,
                AccountId = accountId
            );
            insert newContact;
            return newContact.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating Contact: ' + e.getMessage());
        }
    }
}