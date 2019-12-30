<h1 align="center">Welcome to airbnb 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/doong-jo/airbnb#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/doong-jo/airbnb/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/doong-jo/airbnb/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b601b2c-afa6-4a1a-b72d-8b04f04495b9/deploy-status)](https://app.netlify.com/sites/doong-airbnb-storybook/deploys)

## 📺 [Demo](https://doong-airbnb-storybook.netlify.com/)

## Env

```sh
# install redis-server (follow your OS)
# {project_root}/.env
DB_HOST=<host>
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=<database name>
SESSION_SECRET=<session secret>
```

## Install

```sh
npm install
npm run build
npm run data-init
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Deploy

### 로컬 배포

1. [Docker 설치](https://docs.docker.com/install/)
2. 'Dockerfile'과 같은 경로에서 아래의 명령을 실행

```bash
# install
docker build -t membership/web-app .

# run
docker run --name airbnb_app -p <port you want>:80 -d membership/web-app

# log (optional)
docker ps
docker logs <container id>
```

#### (로컬) 배포 URL : localhost:[port you want] 👀

### 자동 배포

1. cron 스케줄링 설정
```bash
# ubuntu 기준

# crontab 설치
apt-get update & apt-get upgrade
apt-get install cron
# 로컬 전용으로 설치, 메일 주소 default로
sudo apt-get install postfix

# 프로젝트를 배포가 가능하도록 스케줄링 등록 (* * * * * : every miniute)
cat <(crontab -l) <(echo "* * * * * <your_project_path>/auto-deploy.sh > <log_path>/cron.log") | crontab -
```

2. 배포 스크립트 작성 (auto_deploy.mock.sh 참고하여 auto_deploy.sh 생성)
```bash
# auto_deploy.mock.sh
# git 정보를 입력
username="your_user_name"
password="your_password"
branch="your_branch_name"

url="https://$username:$password@github.com/doong-jo/membership-airbnb.git"

cd $project_dir
git remote set-url origin $url
git fetch

find_origin="git rev-parse origin/$branch"
origin_hash=$($find_origin)

find_local=$(git rev-parse $branch)
local_hash=$find_local

# 같으면 exit
if [ "$origin_hash" == "$local_hash" ]; then
        exit
fi

# 둘이 다르면 build
git pull $url

sudo npm install
sudo npm start
```

3. 권한 설정
```bash
# 파일 권한 설정 (실행 허용)
chmod +x auto_deploy.sh
```

## Author

👤 **Sungdong Jo**

-   Github: [@doong-jo](https://github.com/doong-jo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/doong-jo/membership-airbnb/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Sungdong Jo](https://github.com/doong-jo).<br />
This project is [MIT](https://github.com/doong-jo/membership-airbnb/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

