FROM ubuntu

LABEL maintainer="Sungdong Jo <josungdong@naver.com>"

RUN apt-get update && apt-get install -y curl
# use node v10 LTS
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs && apt-get install -y build-essential
RUN apt-get install -y redis-server

RUN mkdir -p /app
# WORKDIR 로 설정
WORKDIR /app
# /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install

ENV NODE_ENV production

EXPOSE 6379 80

CMD ["npm", "start"]
