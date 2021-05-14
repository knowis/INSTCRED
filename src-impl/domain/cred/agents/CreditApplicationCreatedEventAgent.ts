import { agents } from 'solution-framework';


export default class extends agents.cred_CreditApplicationCreatedEventAgent {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('cred_CreditApplicationCreatedEventAgent.execute()');

    const creditApplication = this.input.creditApplicationRequest;

    // set accepted state always to true
    creditApplication.accepted = true;

    // call Integration Service to get the Interest Rates
    const monthlyRate = 5;
    const nominalInterestRate = 0.06;
    const effectiveInterestRate = 0.06

    // construct the credit entity
    const credit = this.factory.entity.cred.Credit();
    credit.amount = creditApplication.amount;
    credit.currency = creditApplication.currency;
    credit.duration = creditApplication.duration;
    credit.name = creditApplication.name;
    credit.purpose = creditApplication.purpose;
    credit.id = creditApplication._id;
    credit.nominalInterestRate = nominalInterestRate.toString();
    credit.monthlyRate = monthlyRate.toString();
    credit.effectiveInterestRate = effectiveInterestRate.toString();

    // persists the credit
    await credit.persist();
  }

}
