import { commands } from 'solution-framework';


export default class extends commands.cred_CreateCreditApplicationCommand {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('cred_CreateCreditApplicationCommand.execute()');

    // Exemplary implementation:
    // Assign the created entity to this.instance. This will also ensure type safety
    // And the factoryCommand will return the correct instanceId automatically
    // this.instance = this.factory.entity.cred.CreditApplication();

    // Persist the instance (if changes were made)
    // await this.instance.persist();
  }

  public async available(): Promise<boolean> {
    return true;
  }

}
