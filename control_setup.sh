#!/bin/bash

##### INSTALLATION
## Configured in /etc/rc.local
#curl -o /home/ubuntu/control_setup.sh https://raw.githubusercontent.com/focrensh/bacon_app/master/control_setup.sh
#chmod +x /home/ubuntu/control_setup.sh
#/home/ubuntu/control_setup.sh > /home/ubuntu/control_setup.log
##chown -R f5student:f5student /home/f5student


cd /home/ubuntu/
rm -rf bacon_app/
source ./.venv/bin/activate
git clone https://github.com/focrensh/bacon_app
cd bacon_app
pip install -r requirements.txt
cd ansible
ansible-playbook config.yaml

