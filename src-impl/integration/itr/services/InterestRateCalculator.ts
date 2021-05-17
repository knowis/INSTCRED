import { services } from 'solution-framework';
export default class extends services.itr_InterestRateCalculator {

  public async execute(): Promise<void> {
    const log = this.util.log;
    log.info('itr_InterestRateCalculator.execute()');

    try {
      // parse input as a number
      const duration = parseFloat(this.input.duration);

      // call getInterestRateByDuration API
      const response = await this.apis.calcInterestRate.getInterestRateByDuration( { duration: duration } );

      const {nominalInterestRate, effectiveInterestRate} = response.body;

      const interestRateResponse = this.factory.entity.itr.InterestRateResponse();
      interestRateResponse.effectiveInterestRate = effectiveInterestRate.toString();
      interestRateResponse.nominalInterestRate = nominalInterestRate.toString();

      this.output = interestRateResponse;

    } catch (err) {
      log.error('Error in InterestRateCalculatorService', err);
    }
  }

}
