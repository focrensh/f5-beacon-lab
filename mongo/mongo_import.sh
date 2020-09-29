#!/bin/bash

mongoimport -d beacon -c bacon -u root -p mySecretPW --authenticationDatabase admin --file /fixtures/bacon.json --jsonArray