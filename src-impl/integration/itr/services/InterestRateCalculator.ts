import { services } from 'solution-framework';

export default class extends services.itr_InterestRateCalculator {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('itr_InterestRateCalculator.execute()');

    try {
      // parse input as a number
      const duration = parseFloat(this.input.duration);

      // call getInterestRateByDuration API
      const response = await this.apis.rateCalculator.getInterestRateByDuration( { duration: duration } );

      const {nominalInterestRate, effectiveInterestRate} = response.body;

      this.output.nominalInterestRate = nominalInterestRate.toString();
      this.output.effectiveInterestRate = effectiveInterestRate.toString();
    } catch (err) {
      log.error('Error in InterestRateCalculatorService', err);
    }
  }

}
