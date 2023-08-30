# Todo-React-MongoDB
## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Prerequisite for local deployment](#prerequisite-for-local-deployment)
* [Setup](#setup)

## General info
A fish names API server designed using Node.js, MongoDB for backed and HTML, JavaScript for frontend. The app is containerized using docker and deployed using kubernetes.

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
* Open the link: http://localhost:3000