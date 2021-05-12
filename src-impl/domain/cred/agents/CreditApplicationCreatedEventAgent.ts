import { agents } from 'solution-framework';


export default class extends agents.cred_CreditApplicationCreatedEventAgent {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('cred_CreditApplicationCreatedEventAgent.execute()');
  }

}
