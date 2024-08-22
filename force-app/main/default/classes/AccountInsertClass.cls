public class AccountInsertClass {
    public static void insertAccount(){
        try{
            /*Account acc = new Account();
            acc.Name='Naresh Demo3';
            acc.Phone='9652380588';
            Insert acc;
            System.debug('Account Details::'+acc);
            System.debug('Account Id::'+acc.Id);
            System.debug('Account Name::'+acc.Name);*/ 
            
            /*List<Account> accountsToInsert = new List<Account>();
            for(Integer i = 0; i < 5; i++) {
                accountsToInsert.add(new Account(Name='Test Account demo' + i));
                System.debug('Accounts insert in process::'+accountsToInsert);
            }
            insert accountsToInsert;
            System.debug('Accounts inserted successfully::'+accountsToInsert);
            System.debug('Accounts inserted Second record Details::'+accountsToInsert.get(2));
            System.debug('Accounts Specific Second record Name ::'+accountsToInsert.get(2).Name);*/ 
            
            //Account acc = new Account(Name = 'Test Account');
            //insert acc;
            /*List<Account> accList = [Select id , Name from Account where id='001dM00000KJUjYQAX'];
            System.debug('Account inserted successfully with Id: ' + accList[0].Id);
            
            Contact con = new Contact(FirstName = 'John', LastName = 'Doe', AccountId = accList[0].Id);
            insert con;
            System.debug('Contact inserted successfully with Id: ' + con.Id + ' associated with Account Id: ' + accList[0].Id);*/
            
            //Account acc = new Account(Name = 'Test Account New');
            //insert acc;
            //System.debug('Account inserted successfully with Id: ' + acc.Id);
            /*List<Account> accList = [Select id , Name from Account where id='001dM00000KJUjYQAX'];
            System.debug('Account inserted successfully with Id: ' + accList[0].Id);
            
            List<Contact> contactsToInsert = new List<Contact>();
            
            for (Integer i = 1; i <= 5; i++) {
                
                Contact con = new Contact();
                con.FirstName = 'John ' + i;
                con.LastName = 'Doe ' + i;
                con.AccountId = accList[0].Id;
                contactsToInsert.add(con);
            }
            
            insert contactsToInsert;
            
            System.debug('Contacts inserted successfully::'+contactsToInsert);
            System.debug('Contacts inserted 3 account details::'+contactsToInsert.get(3));
            System.debug('Contacts inserted 3 account details::'+contactsToInsert.get(3).LastName);*/
            
            //Account myAcct = [SELECT Id, Name, phone,Rating,Industry FROM Account WHERE Id ='001dM00000KJUjYQAX'];
            /*List<Account> myAcct = [SELECT Id, Name, phone,Rating,Industry FROM Account WHERE Id ='001dM00000KJUjYQAX'];
            System.debug('Accout Retrived Details::'+myAcct);
            if(myAcct.size()>0) {
                myAcct[0].Rating='cold';
                myAcct[0].Industry = 'Education';
                myAcct[0].Phone = '9988998899';
                update myAcct;
            }*/
            
            
           /* List<Account> accList = new List<Account>();
            //Insert
			Account acc1 = new Account(Name='Dhoni');
            //update
			Account acc2 = [Select id, name,phone from Account where id='001dM00000KJUjYQAX'];
			acc2.phone ='123456786';
            acc2.Industry ='Communications';
            //add to list
			accList.add(acc1);
			accList.add(acc2);
            //upsert operation
			upsert accList;
			System.debug('accList::'+accList);*/ 
            
            //delete
            /*Account acc2 = [Select id, name,phone from Account where id='001dM00000LebrBQAR'];
			if(acc2 != null) {
				delete acc2;
				System.debug('Account deleted successfully');
			}*/
            
            /*Account acc2 = [Select id, name,phone from Account where id='001dM00000LebrBQAR' ALL ROWS];
			if(acc2 != null) {
				undelete acc2;
				System.debug('Account undeleted successfully');
			}*/ 
            
             // List of specific account names to be inserted
            List<String> accountNames = new List<String>{'Abc', 'Klm', 'Xyz', 'Ravi', 'Mahi'};
            
            // Initialize the list of Account records
            List<Account> accountsToInsert = new List<Account>();
            
            // Loop through the accountNames list and create Account records
            for(Integer i = 0; i < accountNames.size(); i++) {
                String nameWithIndex = accountNames[i]+ ' ' + i; // Append index to account name (+ ' ' + i)
                accountsToInsert.add(new Account(Name=nameWithIndex));
            }
            
            // Insert the list of accounts
            insert accountsToInsert;
            
            // Debug statements
            System.debug('Accounts inserted successfully: ' + accountsToInsert);
            System.debug('Second account record details: ' + accountsToInsert.get(1));
            System.debug('Second account name: ' + accountsToInsert.get(1).Name);
            
        } catch(exception e){
            System.debug('An error occurred while inserting the account: ' +e.getMessage());
        }
    }
}