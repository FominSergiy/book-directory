FROM ubuntu:latest as postgres-wait

# Install necessary dependencies
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /app

# Copy the script to wait for PostgreSQL container
COPY wait-for-postgres.sh /app/wait-for-postgres.sh

# Grant execute permission to the script
RUN chmod +x /app/wait-for-postgres.sh
RUN ./wait-for-postgres.sh postgres_container 5432 echo 'Yay, continue'


FROM node:18.16.1 as migration

WORKDIR /app

COPY ./prisma ./prisma/
COPY ./package.json ./

RUN npm install prisma
RUN npx prisma generate

# migrate the schema and seed the database
CMD npx prisma migrate deploy && npx prisma db seed



