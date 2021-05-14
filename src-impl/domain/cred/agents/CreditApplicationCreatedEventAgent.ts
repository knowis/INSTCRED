import { agents } from 'solution-framework';


export default class extends agents.cred_CreditApplicationCreatedEventAgent {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.debug('cred_CreditApplicationCreatedEventAgent.execute()');

    const creditApplication = this.input.creditApplicationRequest;

    // set accepted state always to true
    creditApplication.accepted = true;

    // construct inputs for services
    const interestRateCalculatorInput = this.factory.entity.itr.InterestRateCalculator_Input();
    interestRateCalculatorInput.duration = creditApplication.duration;

    const monthlyRateCalculatorInput = this.factory.entity.itr.MonthlyRateCalculatorRequest();
    monthlyRateCalculatorInput.amount = creditApplication.amount;
    monthlyRateCalculatorInput.duration = creditApplication.duration;

    // call Integration Service to get the nominal and effective interest rates
    const { nominalInterestRate, effectiveInterestRate } = await this.services.itr.InterestRateCalculator(interestRateCalculatorInput);

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
  }

}
