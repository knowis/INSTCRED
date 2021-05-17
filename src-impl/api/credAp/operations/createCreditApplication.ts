import { operations } from 'solution-framework';

export default class extends operations.credAp_createCreditApplication {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('credAp_createCreditApplication.execute()');

    try {
      const requestBody = this.request.body;

      // If there is no existing credit application in the status "New", create a new instance
      const createCreditApplicationInput = this.factory.entity.cred.CreateCreditApplicationCommand_Input();
      createCreditApplicationInput.creditApplicationRequest = this.factory.entity.cred.CreditApplicationRequest();

      createCreditApplicationInput.creditApplicationRequest.amount = requestBody.amount.toString();
      createCreditApplicationInput.creditApplicationRequest.currency = requestBody.currency;
      createCreditApplicationInput.creditApplicationRequest.duration = requestBody.duration.toString();
      createCreditApplicationInput.creditApplicationRequest.purpose = requestBody.purpose;
      createCreditApplicationInput.creditApplicationRequest.name = requestBody.name;
      createCreditApplicationInput.creditApplicationRequest.accepted = requestBody.accepted;

      // call the associated command
      await this.repo.cred.CreditApplication.CreateCreditApplicationCommand(createCreditApplicationInput);

      // set response status if command was properly executed
      this.response.status = 200;

    } catch (err) {
      this.response.status = 500;
      log.error('Error in createCreditApplication Operation', err);
    }

  }

  /**
   * This function is automatically called when an error occurs within the execution flow of operation credAp_createCreditApplication
   * @param error Operation execution error that occurred.
   */
  public async handleError(error: Error): Promise<void> {
    const log = this.util.log;
    log.debug('credAp_createCreditApplication.handleError()');
    // Add Error handling logic below and set this.response that will be returned as operation credAp_createCreditApplication response
  }

}
