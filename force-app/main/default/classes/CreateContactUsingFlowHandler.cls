public class CreateContactUsingFlowHandler {
	@InvocableMethod(label = 'Insert Contact' 
                     description='Inserts the Contacts.')
    public static List<Contact> createContact(List<Account> accList){
        List<Contact> conList = new List<Contact>();
        for(Account acc: accList){
            Contact con = new Contact();
            con.LastName= acc.Name;
            con.AccountId = acc.Id;
            con.Phone ='9900990000';
            conList.add(con);
        }
        insert conList;
        return conList;
    }
}