public class SynchronousExample {

		public void runSync() {
			// Query for opportunities in the 'Prospecting' stage
			List<Opportunity> opportunities = [SELECT Id FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 100];
			
			// Initialize a list to store the opportunity Ids
			List<Id> oppIds = new List<Id>();
			
			// Add each Opportunity Id to the list
			for (Opportunity opp : opportunities) {
				oppIds.add(opp.Id);
			}
			
			// Call the synchronous method to update the opportunities
			SyncOpportunityService.updateOpportunityStage(oppIds);
			
			System.debug('Synchronous update complete');
		}
	}