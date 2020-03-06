FROM python:3.7.6

MAINTAINER Dachi Darchiashvili <darchiashvilidachi@yahoo.com>


RUN mkdir -p /src/server
WORKDIR /src/server

ADD apps /src/server/apps
ADD server /src/server/server
ADD templates /src/server/templates
ADD manage.py /src/server/manage.py
ADD requirements.txt /src/server/requirements.txt

RUN apt install build-essential -y

RUN pip install --upgrade pip && pip install -r requirements.txt --no-cache-dir
RUN rm -rf requirements.txt
RUN python -m 'import nltk; nltk.download("all")'

EXPOSE 8000

CMD [ "uwsgi", \
      "--vacuum", \
      "--master", \
      "--enable-threads", \
      "--process", "10", \
      "--chdir", "/src/server", \
      "--http-socket", "0.0.0.0:8000", \
      "--socket", "0.0.0.0:8000", \
      "--wsgi-file", "server/wsgi.py", \
      "--module", "server.wsgi:application" ]