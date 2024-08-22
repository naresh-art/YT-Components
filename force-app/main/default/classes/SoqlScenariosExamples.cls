public class SoqlScenariosExamples {

    public static void updateAllAccountsPhone(){
        
        //query Opportunity Records 
        List<Opportunity> oppList =[Select Id, CloseDate, StageName from Opportunity];
        System.debug('oppList Records::'+oppList);
        
        if(oppList.size()>0){
            for(Opportunity opp:oppList){
                if(opp.StageName=='Prospecting'){
                    opp.LeadSource='Phone Inquiry';
                } 
                else {
                    opp.LeadSource='Web';
                }
            } 
        }
        
        if(oppList.size()>0){
           update oppList;
        }
  
    }
}