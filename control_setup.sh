#!/bin/bash

user="ubuntu"
home="/home/$user"
currentuser=$(whoami)
develfile=/home/ubuntu/devel

if test -f "$develfile"; then
    echo "######## RUNNING WITH DEVEL FLAG ########"
    flag="devel"
fi

apt update
apt install docker.io python3-pip python3-venv rpm jq -y

cd /home/ubuntu/
rm -rf bacon_app/
python3 -m venv .venv
source ./.venv/bin/activate
git clone https://github.com/focrensh/bacon_app
cd bacon_app/ansible

if [ "$flag" = "devel" ]; then
    git checkout devel
fi

pip3 install -r requirements.txt
ansible-galaxy install f5devcentral.f5app_services_package -p ./roles/
ansible-galaxy install f5devcentral.atc_deploy,v0.11.0 -p ./roles/ --force
ansible-playbook server_config.yaml
ansible-playbook bigip_config.yaml


# ### VSCODE
# systemctl stop code-server@ubuntu
# curl -fsSL https://code-server.dev/install.sh | sh
# mkdir -p /home/ubuntu/.config/code-server
# cat > /home/ubuntu/.config/code-server/config.yaml << EOF
# bind-addr: 0.0.0.0:8080
# auth: password
# password: 3eaconlab
# cert: false
# EOF

# mkdir -p /home/ubuntu/.local/share/code-server/User
# cat > /home/ubuntu/.local/share/code-server/User/settings.json << EOF
# {
#     "workbench.colorTheme": "Visual Studio Dark",
#     "terminal.integrated.shell.linux": "/bin/bash"
# }
# EOF

chown -R $user:$user $home
# systemctl enable --now code-server@ubuntu
# sleep 15
# echo "Ready"




