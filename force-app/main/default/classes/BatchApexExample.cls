public class BatchApexExample implements Database.Batchable<SObject> {
		// Query to fetch the records to process
		public Database.QueryLocator start(Database.BatchableContext BC) {
			return Database.getQueryLocator('SELECT Id, StageName FROM Opportunity');
		}
    	// Process each batch of records
		public void execute(Database.BatchableContext BC, List<Opportunity> scope) {
			for (Opportunity opp : scope) {
				opp.StageName = 'Qualification';
			}
			update scope; // Perform DML operation to update the records
		}
		
		// Post-processing logic after all batches are processed
		public void finish(Database.BatchableContext BC) {
			System.debug('All records have been updated.');
			// Add any post-processing logic here
		}
}