import { operations } from 'solution-framework';

export default class extends operations.credAp_createCreditApplication {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('credAp_createCreditApplication.execute()');
    const requestBody = this.request.body;

    // If there is no existing credit application in the status "New", create a new instance
    const createCreditApplicationInput = this.factory.entity.cred.CreateCreditApplicationCommand_Input();

    createCreditApplicationInput.creditApplicationRequest.amount = requestBody.amount.toString();
    createCreditApplicationInput.creditApplicationRequest.currency = requestBody.currency;
    createCreditApplicationInput.creditApplicationRequest.duration = requestBody.duration.toString();
    createCreditApplicationInput.creditApplicationRequest.purpose = requestBody.purpose;
    createCreditApplicationInput.creditApplicationRequest.name = requestBody.name;
    createCreditApplicationInput.creditApplicationRequest.accepted = requestBody.accepted;

    const creditApplication = await this.repo.cred.CreditApplication.CreateCreditApplicationCommand(createCreditApplicationInput);
    if (creditApplication) {
      this.response.status = 200;
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
