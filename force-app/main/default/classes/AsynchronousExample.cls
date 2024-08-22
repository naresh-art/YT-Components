public class AsynchronousExample {

		public void runAsync() {
			// Query for opportunities in the 'Prospecting' stage
			List<Opportunity> opportunities = [SELECT Id FROM Opportunity WHERE StageName = 'Prospecting' LIMIT 100];
			
			// Initialize a list to store the opportunity Ids
			List<Id> oppIds = new List<Id>();
			
			// Add each Opportunity Id to the list
			for (Opportunity opp : opportunities) {
				oppIds.add(opp.Id);
			}
			
			// Call the future method to update the opportunities asynchronously
			FutureOpportunityService.updateOpportunityStage(oppIds);
			
			System.debug('Future method enqueued for execution');
		}
	}