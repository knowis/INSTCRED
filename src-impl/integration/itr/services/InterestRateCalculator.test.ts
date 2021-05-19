import { expect } from 'chai';
import { serviceRunners, TestEnvironment } from 'solution-framework';


describe('itr:InterestRateCalculator', () => {

  const testEnvironment = new TestEnvironment();
  before(async () => {
    // This block will run automatically before all tests.
    // Alternatively, use beforeEach() to define what should automatically happen before each test.
    // This is an optional block.
  });
  after(async () => {
    // This block will run automatically after all tests.
    // Alternatively, use afterEach() to define what should automatically happen after each test.
    // This is an optional block.

    // Recommended: remove all instances that were created
    // await testEnvironment.cleanup();
  });

  it('works', async () => {
    // given
    const runner = new serviceRunners.itr_InterestRateCalculatorRunner();
    runner.input = testEnvironment.factory.entity.itr.InterestRateCalculator_Input();
    runner.input.duration = '12';

    // when
    await runner.run();

    // then
    const nominalRate = runner.output.nominalInterestRate;
    const effectiveRate = runner.output.effectiveInterestRate;

    expect(nominalRate).to.equal('0.01075');
    expect(effectiveRate).to.equal('0.0108');
  });

});
