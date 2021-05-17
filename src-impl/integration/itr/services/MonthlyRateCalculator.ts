import { services } from 'solution-framework';
import { CalcInput } from 'solution-framework/dist/sdk/v1/namespace/apiFacadeSchema/itr_calcMontlyRate';

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
      const response = await this.apis.calcMontlyRate.calculate(input);

      const monthlyRateResponse = this.factory.entity.itr.MonthlyRateCalculator_Output();
      monthlyRateResponse.monthlyRate = response.body.monthlyRate.toString();

      this.output = monthlyRateResponse;

    } catch (err) {
      log.error('Error in MonthlyRateCalculator', err);
    }
  }

}
