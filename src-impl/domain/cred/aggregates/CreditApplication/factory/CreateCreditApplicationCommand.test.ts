import { expect } from 'chai';
import { commandRunners, TestEnvironment } from 'solution-framework';


describe('cred:CreateCreditApplicationCommand', () => {

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
    const runner = new commandRunners.cred_CreateCreditApplicationCommandRunner();
    runner.input = testEnvironment.factory.entity.cred.CreateCreditApplicationCommand_Input();
    runner.input.creditApplicationRequest = testEnvironment.factory.entity.cred.CreditApplicationRequest();
    runner.input.creditApplicationRequest.accepted = true;
    runner.input.creditApplicationRequest.amount = '200';
    runner.input.creditApplicationRequest.currency = 'Euro';
    runner.input.creditApplicationRequest.duration = '20';
    runner.input.creditApplicationRequest.name = 'mri';
    runner.input.creditApplicationRequest.purpose = 'New Credit app';

    await runner.run();
    console.warn('No tests available');
    expect(true).to.equal(true);
  });

});
