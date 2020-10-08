#!/bin/bash

##### INSTALLATION
## Configured in /etc/rc.local
#curl -o /home/ubuntu/control_setup.sh https://raw.githubusercontent.com/focrensh/bacon_app/master/control_setup.sh
#chmod +x /home/ubuntu/control_setup.sh
#/home/ubuntu/control_setup.sh > /home/ubuntu/control_setup.log
##chown -R f5student:f5student /home/f5student


cd /home/ubuntu/
apt install rpm -y
rm -rf bacon_app/
python3 -m venv .venv
source ./.venv/bin/activate
git clone https://github.com/focrensh/bacon_app
cd bacon_app/ansible
pip3 install -r requirements.txt
ansible-galaxy install f5devcentral.f5app_services_package -p ./roles/
ansible-galaxy install f5devcentral.atc_deploy,v0.11.0 -p ./roles/ --force
ansible-playbook server_config.yaml
ansible-playbook bigip_config.yaml