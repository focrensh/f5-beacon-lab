# Bacon App for F5 Beacon

## Requirements
* F5CS Account created and subscribed to Beacon
* Access to either UDF or an AWS account (coming soon) for infrastructure

## Draft Steps
1. UDF will deploy infrastructure and app containers on boot
1. On the Control machine login to VSCODE under `Access Methods`
1. Update env vars with your:
    
    * F5CS Username: `export BEACON_UN='username'`
    * F5CS Password: `export BEACON_PW='password'`
    * F5CS AccountID: `export BEACON_ACCT='acctid'` (add notes how to get this)

1. Change directory to the ansible folder `cd ./bacon_app/ansible`
1. Update `./bacon_app/ansible/vars.yaml` to include the HTTP endpoints of your East and West application. These will be used for destinations of your Beacon Monitors. If you are using UDF, check the **Access Methods** of the **East** and **West** servers for the `URL Frontend`. Place that in the appropriate section within the vars file. Example below:

   ```
   http_monitors:
     - name: "Bacon East"
         url: "https://EastURL.udf.f5.com"
     - name: "Bacon West"
         url: "https://WestURL.udf.f5.com"
   ```

1. Run the `beacon_config.yaml` playbook to configure your Beacon account and update the infrastructure with a token to send Telemetry metrics to Beacon. Summary of what will be created:

    * Create Ingest Token in F5 Beacon
    * Update EAST/WEST telegraf data collectors with the Ingest Token to send data to your account
    * Model the **Bacon** application in F5 Beacon
    * Create Insights
    * Create Beacon Monitors
    * Create Metric Health Conditions

    `ansible-playbook beacon_config.yaml`




## Clean Up
After you are done with the lab, there is an ansible playbook in the ansible folder called `beacon_clear.yaml`. It will delete objects that this lab automatically created. Keep in mind that if you manually add objects, the playbook will not know to remove those. If UDF shutsdown prior to running the cleanup playbook, it is possible to run it outside of UDF as long as you provide it your credentials.