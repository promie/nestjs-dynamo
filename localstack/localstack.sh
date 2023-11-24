#!/usr/bin/env bash
localstack start -d
sleep 3
awslocal dynamodb create-table --cli-input-json file://notes-api.json --region us-east-1
