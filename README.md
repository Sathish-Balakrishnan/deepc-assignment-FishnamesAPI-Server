# FishnamesAPI-Server
## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Prerequisite for local deployment](#prerequisite-for-local-deployment)
* [Setup](#setup)

## General info
A fish names API server designed using Node.js, MongoDB for Backend, and HTML, JavaScript for frontend. The app is containerized using Docker and deployed using Kubernetes.

## Features
- Fetch  fishnames from internet
- Statefull based on user IP

## Technologies
Project is created with:

* Node.js
* Bash / Shell
* MongoDB
* JavaScript
* HTML
* CSS
* Docker
* kubernetes

## Prerequisite for local deployment
- Docker daemon runnning in background
- Minikube cluster running inside docker
	
## Setup
To run this project, follow the below steps:

```
$ Clone the project and execute the below commands in the root directory of the project.
$ docker context use default
$ docker build -t backend-image -f Backend/Dockerfile .
$ kubectl apply -f mongo-deployment.yaml
$ kubectl apply -f .\mongo-service.yaml
$ kubectl apply -f .\backend-deployment.yaml
$ kubectl apply -f .\backend-service.yaml
$ minikube image load backend-image
$ minikube service backend-service
```
* After the successfull deployment, open the browser in the url provided by service: http://hostname:port/GUI
