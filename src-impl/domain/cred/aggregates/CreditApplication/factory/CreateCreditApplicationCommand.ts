import { commands } from 'solution-framework';

export default class extends commands.cred_CreateCreditApplicationCommand {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('cred_CreateCreditApplicationCommand.execute()');

    try {

      const creditApplicationRequest = this.input.creditApplicationRequest;

      // Create CreditApplication instance
      this.instance = this.factory.entity.cred.CreditApplication();
      this.instance.accepted = creditApplicationRequest.accepted;
      this.instance.amount = creditApplicationRequest.amount;
      this.instance.currency = creditApplicationRequest.currency;
      this.instance.duration = creditApplicationRequest.duration;
      this.instance.name = creditApplicationRequest.name;
      this.instance.purpose = creditApplicationRequest.purpose;

      // Persist the instance
      await this.instance.persist();

      // Create the event payload
      const event = this.factory.event.cred.CreditApplicationCreatedEvent();
      event.payload = this.factory.entity.cred.CreditApplicationRequest();
      event.payload.accepted = creditApplicationRequest.accepted;
      event.payload.amount = creditApplicationRequest.amount;
      event.payload.currency = creditApplicationRequest.currency;
      event.payload.duration = creditApplicationRequest.duration;
      event.payload.name = creditApplicationRequest.name;
      event.payload.purpose = creditApplicationRequest.purpose;

      // Publish the event
      await event.publish();

    } catch (err) {
      log.error('Error in CreateCreditApplicationCommand', err);
      throw err;
    }
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
