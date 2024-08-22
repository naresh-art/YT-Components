public class ApexSOQLexample {
    public List<Account> getAccounts() {
        List<Account> accList =[SELECT Id, Name, Industry,Rating FROM Account];
        System.debug('accList::'+accList);
        return accList;
    }
}