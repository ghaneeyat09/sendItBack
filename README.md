# sendIt

## Overview

sendIt is a super fast courier service put in place to ease picking-up and delivering of goods anywhere within Nigeria.

## Available Endpoints

see below for the available endpoints of the sendIt courier project.

N.B: Some of the endpoints are authorized and you will have to be logged in before you can access them.

   Routes         |      functionality           |    Authorization   |
 -----------------|  --------------------------  |  ----------------- |
POST/user/register|     register new user        |       false        |
POST/user/login   |       login user             |       false        |
POST/order        |     create an order          |       true         |
GET/user/userId/order| fetch specific user orders|       true         |
GET/order            |     fetch all orders      |       true         |
GET/order/orderId    |  fetch a specifc Order    |       true         |
   
 ##  Accession
 
 ####  You can access sendIt endpoints via: <a href="https://send-it-back-app.herokuapp.com">this link</a>
