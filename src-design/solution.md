# Purpose & Capabilities

This solution offers possibilities to create a credit application. The application will get processed and after an approval it creates a credit out of the application.
<br>
## Diagram

``` fsw
solution all
```
<br>
## APIs

One API is exposed which is a POST operation on path <span class="colour" style="color:rgb(82, 82, 82)">**/creditApplication**</span>
<br>
## Domains

Main purpose of the solution is to create a credit of a credit application was created and processed successfully. In order to do so this solution holds two root entities Credit and Credit Application with its related database collections to store the entities. Credit Application is created with a factory command. This command triggers the event [CreditApplicationCreatedEvent](https://qa-designer.apps.openshift-03.knowis.cloud/#/INSTCRED/Track/master/Domain/cred/Event/CreditApplicationCreatedEvent "CreditApplicationCreatedEvent"). The Agent [CreditApplicationCreatedEventAgent](https://qa-designer.apps.openshift-03.knowis.cloud/#/INSTCRED/Track/master/Domain/cred/Agent/CreditApplicationCreatedEventAgent "CreditApplicationCreatedEventAgent") is listening to the event [CreditApplicationCreatedEvent](https://qa-designer.apps.openshift-03.knowis.cloud/#/INSTCRED/Track/master/Domain/cred/Event/CreditApplicationCreatedEvent "CreditApplicationCreatedEvent") and approves the Credit application and creates a Credit out of it.

<br>
## Integrations

In order to integrate the Interest Rate calculator and the monthly Rate calculator two API dependencies are available to implement the solution. Each API dependency has its own service and input and output entities.