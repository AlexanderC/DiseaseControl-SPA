DiseaseControl Frontend
========

DiseaseControl is a disease control platform that facilitates end-to-end tracking of disease cases and resolutions keeping all nodes involved, starting from local level and growing up into a county wide level. This piece of software is originally designed to cover the needs of control software for Moldovan healthcare system for fighting against Coronavirus Covid-19. 

> The project started at [C19.md Initiative](https://c19.md/) [Hackaton](https://c19.md/hackathon) (March 2020).

Prerequisites
-----------

- [ ] Git
- [ ] Docker
- [ ] *NodeJS v12.x.x (for non docker usage)*

Installation
---------

```bash
git clone https://github.com/nicoletailiuha/frontend-disease-control.git
cd frontend-disease-control
npm i
```

Usage
-----

Start develpment server:

```bash
npm run start
```

Build project:

```bash
npm run build
```

Deploy
------

Deploy to a server you have SSH access given:

```bash
DEPLOY_SERVER_ROOT=/root/spa DEPLOY_SERVER_DSN=root@139.59.159.64 ./bin/deploy.sh
```

> The server as to have Docker installed.

Links
--------

- [API Repository](https://github.com/AlexanderC/DiseaseControl)
- [Api Docs](http://localhost:8000/)
- [Product Vision](https://docs.google.com/document/d/15XOLQsRgfhh7dy5_gKIxMTNreHUQNgU5r3dOybIkKrw/edit)
