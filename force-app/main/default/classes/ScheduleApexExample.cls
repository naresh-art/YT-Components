public class ScheduleApexExample implements Schedulable {
    public void execute(SchedulableContext sc) {
        	//batch Class Declartion
          	BatchApexExample batch = new BatchApexExample();
			Database.executeBatch(batch,10);
        
        
        /*if you want logic
            // Query the records to update
			List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity];
			
			// Update the records
			for (Opportunity opp : oppsToUpdate) {
				opp.StageName = 'Qualification';
			}
			
			if (!oppsToUpdate.isEmpty()) {
				update oppsToUpdate;
			}
		*/
       }
}