#!/bin/bash

date

user="ubuntu"
home="/home/$user"
currentuser=$(whoami)
develfile=/home/ubuntu/devel

if test -f "$develfile"; then
    echo "######## RUNNING WITH DEVEL FLAG ########"
    flag="devel"
fi


### VSCODE
systemctl stop code-server@ubuntu
curl -fsSL https://code-server.dev/install.sh | sh
mkdir -p /home/ubuntu/.config/code-server
cat > /home/ubuntu/.config/code-server/config.yaml << EOF
bind-addr: 0.0.0.0:8080
auth: password
password: 3eaconlab
cert: false
EOF

mkdir -p /home/ubuntu/.vscode
cat > /home/ubuntu/.vscode/settings.json << EOF
{
    "workbench.colorTheme": "Visual Studio Dark",
    "terminal.integrated.shell.linux": "/bin/bash"
}
EOF

chown -R $user:$user $home
systemctl enable --now code-server@ubuntu

apt update
apt install docker.io python3-pip python3-venv rpm jq -y

cd /home/ubuntu/
rm -rf f5-beacon-lab/
python3 -m venv .venv
source ./.venv/bin/activate
git clone https://github.com/f5devcentral/f5-beacon-lab
cd f5-beacon-lab/ansible

if [ "$flag" = "devel" ]; then
    git checkout devel
fi

pip3 install -r requirements.txt
ansible-galaxy install f5devcentral.f5app_services_package -p ./roles/
ansible-galaxy install f5devcentral.atc_deploy,v0.11.0 -p ./roles/ --force
ansible-playbook server_config.yaml
ansible-playbook bigip_config.yaml

chmod +x /home/ubuntu/f5-beacon-lab/scenarios/*
chown -R $user:$user $home

sleep 15
echo "Ready"
date




