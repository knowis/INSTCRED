import { expect } from 'chai';
import { operationRunners, TestEnvironment } from 'solution-framework';
import { credAp_createCreditApplicationRequest } from 'solution-framework/dist/sdk/v1/namespace/operationRequest/credAp_createCreditApplicationRequest';


describe('createCreditApplication', () => {
  const testEnvironment = new TestEnvironment();

  after(async () => {
    // This block will run automatically after all tests.
    // Alternatively, use afterEach() to define what should automatically happen after each test.
    // This is an optional block.

    // Recommended: remove all instances that were created
    // await testEnvironment.cleanup();
  });
  it('works', async () => {
    // given
    const runner = new operationRunners.credAp_createCreditApplicationRunner();
    runner.request = new credAp_createCreditApplicationRequest();
    runner.request.body = testEnvironment.factory.schema.credAp.CreditApplication();
    runner.request.body.amount = 100;
    runner.request.body.currency = 'EUR';
    runner.request.body.name = 'psc';
    runner.request.body.duration = 12;
    runner.request.body.purpose = 'test';
    runner.request.body.accepted = true;

    // when
    await runner.run();

    // then
    expect(runner.response.status).to.equal(200);
  });

});
