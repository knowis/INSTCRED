import { services } from 'solution-framework';
import { CalcInput } from 'solution-framework/dist/sdk/v1/namespace/apiFacadeSchema/itr_rateCalculator';

export default class extends services.itr_MonthlyRateCalculator {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('itr_MonthlyRateCalculator.execute()');

    try {
      const duration = this.input.duration;
      const amount = this.input.amount;

      // call interest Rate Calculator API to get nominal interest rate
      const interestRateInput = this.factory.entity.itr.InterestRateCalculator_Input();
      interestRateInput.duration = duration;
      const nominalInterestRate = (await this.services.itr.InterestRateCalculator(interestRateInput)).nominalInterestRate;

      const input: CalcInput = {
        duration: parseFloat(duration),
        amount: parseFloat(amount),
        nominalInterestRate: parseFloat(nominalInterestRate),
      }

      // call calculate API
      const response = await this.apis.rateCalculator.calculate( input );

      const monthlyRate = response.body.monthlyRate;

      this.output.monthlyRate = monthlyRate.toString();
    } catch (err) {
      log.error('Error in MonthlyRateCalculator', err);
    }
  }

}