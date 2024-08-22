public class OpportunityService {
		@future
        public static void updateOpportunityStage(List<Id> opportunityIds) {
            List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity WHERE Id IN :opportunityIds];
            for(Opportunity opp : oppsToUpdate) {
                opp.StageName = 'Closed Won';
            }
            if(!oppsToUpdate.isEmpty()){
                update oppsToUpdate;
            }
        }
}