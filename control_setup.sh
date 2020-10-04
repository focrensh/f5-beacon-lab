#!/bin/bash

##### INSTALLATION
## Configured in /etc/rc.local
## https://github.com/focrensh/bacon_app
## chmod +x /home/f5student/update_git.sh
## /home/f5student/update_git.sh > /home/f5student/update_git.log
## chown -R f5student:f5student /home/f5student


cd /home/ubuntu/
rm -rf bacon_app/
source ./.venv/bin/activate
git clone https://github.com/focrensh/bacon_app
cd bacon_app
pip install -r requirements.txt
cd ansible
ansible-playbook config.yaml

