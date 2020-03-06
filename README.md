# About

Purpose: Coding assignment.

Work duration: about 5 working hours.

Requirements:
Todo

# Prerequisites
------

`Python >= 3.7`   
`Django >= 3.0.1`   
`postgres >= 12.x`   

# Setup Project 
------

```bash
$ git clone <project_repo>
```

Install dependencies from `requirements.txt` file

```bash
$ cd <project_directory>/
```

```bash
$ pip install -r requirements.txt
```

# Dockerize
------

## 0. Configure docker

First run: `docker swarm init`

## 1. Build an image from a Dockerfile

General command: `docker build -t [image_title]:[tag] [context]`

##### Just run: `$ docker build -t server .`

or `$ docker build -f Dockerfile -t server .`

## 2. Run containers

```bash
$ docker-compose up -d pgdb
$ docker-compose up -d server
$ docker-compose up -d client
```

or `docker-compose up -d`

## 3. Run migrations in server shell

To run these commands: `$ docker exec -ti server sh`

```bash
$ python manage.py migrate --settings server.settings
$ exit
```

## 4. Done

