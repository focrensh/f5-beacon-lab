Lab Overview and Setup
======================

.. NOTE:: UDF will deploy the infrastructure and app containers on boot. Follow the steps below to connect the lab to your F5 Beacon account.

Steps
-----

#. On the Control machine login to VSCODE under `Access Methods` using password "3eaconlab"

   |control_vscode|

#. If you do not see a terminal located at the bottom of the screen, press **ctrl + `** to make it appear.

   |terminal|

#. Now we need to update enviornment variables with your F5CS information. Update the following commands with your information and paste them into the terminal.

   .. code:: shell
   
      export BEACON_UN='username'
      export BEACON_PW='password'
      export BEACON_ACCT='acctid' (add notes how to get this)

#. Activate the python virtual environment installed by the UDF setup scripts:

   ``source /home/ubuntu/.venv/bin/activate``

#. Change directory to the ansible folder:

   ``cd /home/ubuntu/bacon_app/ansible``

#. Run the ``beacon_config.yaml`` playbook to configure your Beacon account and update the infrastructure with a token to send Telemetry metrics to Beacon. Below is a summary of what will be created:

   * F5 Beacon Data Ingest Token
   * Add the Ingest Token to **Telemetry Streaming** on BIG-IP
   * Update the EAST/WEST telegraf data collectors with the Ingest Token to send metrics to F5 Beacon
   * Model the **Bacon** application in F5 Beacon
   * Create Insights
   * Create Beacon Synthetic Monitors
   * Create Metric Health Conditions on components


   Run the following Command:

   ``ansible-playbook beacon_config.yaml``

   All Tasks should come back as **ok** or **changed**:

   |beacon_conf_run|

Your environment should now be setup to begin the lab.


.. |control_vscode| image:: images/lab_setup/control_vscode.png
.. |terminal| image:: images/lab_setup/terminal.png
.. |terminal| image:: images/lab_setup/terminal.png
.. |vars_tree| image:: images/lab_setup/vars_tree.png
.. |east_url| image:: images/lab_setup/east_url.png
.. |west_url| image:: images/lab_setup/west_url.png
.. |vars_update| image:: images/lab_setup/vars_update.png
.. |beacon_conf_run| image:: images/lab_setup/beacon_conf_run.png