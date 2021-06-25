import { agents } from 'solution-framework';

export default class extends agents.cred_CreditApplicationCreatedEventAgent {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('cred_CreditApplicationCreatedEventAgent.execute()');
    // just a comment

    try {
      const creditApplication = this.factory.entity.cred.CreditApplicationRequest();
      creditApplication.amount = this.input.creditApplicationRequest.amount;
      creditApplication.currency = this.input.creditApplicationRequest.currency;
      creditApplication.duration = this.input.creditApplicationRequest.duration;
      creditApplication.name = this.input.creditApplicationRequest.name;
      creditApplication.purpose = this.input.creditApplicationRequest.purpose;

      log.info('Received Agent Payload: ', this.input.creditApplicationRequest);
      log.info('Received Agent Payload Duration: ', creditApplication.duration);

      // set accepted state always to true
      creditApplication.accepted = true;

      // construct inputs for services
      const interestRateCalculatorInput = this.factory.entity.itr.InterestRateCalculator_Input();
      interestRateCalculatorInput.duration = creditApplication.duration;

      // call Integration Service to get the nominal and effective interest rates
      const { nominalInterestRate, effectiveInterestRate } = await this.services.itr.InterestRateCalculator(interestRateCalculatorInput);

      const monthlyRateCalculatorInput = this.factory.entity.itr.MonthlyRateCalculatorRequest();
      monthlyRateCalculatorInput.amount = creditApplication.amount;
      monthlyRateCalculatorInput.duration = creditApplication.duration;
      monthlyRateCalculatorInput.nominalInterestRate = nominalInterestRate.toString();

      // call Integration Service to get the monthly rate
      const { monthlyRate } = await this.services.itr.MonthlyRateCalculator(monthlyRateCalculatorInput);

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

    } catch (err) {
      log.error('Error in CreditApplicationCreatedEventAgent', err);
    }
  }

}
