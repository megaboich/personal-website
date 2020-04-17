---
layout: post.hbs
title: HTTP for beginners
date: 2019-03-27
readingTime: 10
collection: posts
tags:
  - HTTP
  - REST
  - API
---

> This article is an introduction for beginners into HTTP, API and REST matters. Big thanks to excellent documentation from MDN: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview.

HTTP is a protocol which allows the fetching of resources, such as HTML documents. It is the foundation of any data exchange on the Web and a client-server protocol, which means requests are initiated by the recipient, usually the Web browser. A complete document is reconstructed from the different sub-documents fetched, for instance text, layout description, images, videos, scripts, and more.

<!--cut-->

![](images/Fetching_a_page.png)

_Image is taken from the MDN website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview._

## HTTP is a client-server protocol

Each individual request is sent to a server, which will handle it and provide an answer, called the response. Between this request and response there are numerous entities, collectively designated as proxies, which perform different operations and act as gateways or caches, for example.

![](images/Client-server-chain.png)

_Image is taken from the MDN website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview._

- Client: the user-agent
- The Web server
- Proxies

## HTTP flow

1. Open TCP connection
2. Send a request

```
GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr
```

3. Receive a response:

```
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html... (here comes the 29769 bytes of the requested web page)
```

4. Close connection

## HTTP Request

![](images/HTTP_Request.png)

_Image is taken from the MDN website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview._

Methods: GET, POST, [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS), HEAD

Headers:

- **Accept**: application/json
- **Accept-Encoding**: gzip, deflate, br
- **Accept-Language**: en-US,en;q=0.9
- **Content-Type**: application/json;charset=UTF-8
- **Cookie**: \_ga=GA1.1.279945238.1538047637; BAYEUX_BROWSER=xl0ydxss3t6c1wn8; glide_user_route=glide.bc4183be9d54d8709bf320ec7b40ddea; glide_user_activity="U0N2Mzp1b29EeERpTUcrL2xtNzhZMHpEdmx4TmxJMUx5V3U5STozSy9JM1F5ZEF3Y1JzUWJsRGYrTTlnaVBVUk5PU1hiK2ZicE1pRlV5cUZzPTo2ODE2Zjc5Y2MwYTgwMTY0MDFjNWEzM2JlMDRiZTQ0MQ=="; JSESSIONID=4587CA945CDF2900CF1172589E4A623E;
- **Cache-Control**: no-cache
- **Referer**: http://localhost:9090/$pa_detailed.do?jvar_uuid=fb007202d7130100b96d45a3ce6103b4&jvar_breakdown=0df47e02d7130100b96d45a3ce610399&jvar_elements=c1a861a7b90033000099145cdb12f0b4,81a861a7b90033000099145cdb12f0b4
- **User-Agent**: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36
- **X-UserToken**: 13d3dbe377103300fde1bfc2681061bc851f6637198786af5654ffa00b5453c904e12fd7

Body is optional

## HTTP Response

![](images/HTTP_Response.png)

_Image is taken from the MDN website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview._

Headers:

- **Content-Type**: text/html

Body is optional

## HTTP API

An API is an application programming interface. It is a set of rules that allow programs to talk to each other. The developer creates the API on the server and allows the client to talk to it.

### SOAP

SOAP (Simple Object Access Protocol) is its own protocol based on XML. It could be used with different transport protocols, but mostly used over HTTP because it has the advantage that it is a protocol that is open to firewalls, well-understood and widely-supported. Thus, web services can be accessed and exposed via technology already in-place.

```xml
HTTP/1.1 200 OK
Content-Type: text/xml; charset="utf-8"
Content-Length: nnnn

    <SOAP-ENV:Envelope
  xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
   <SOAP-ENV:Header>
       <t:SessionOrder
         xmlns:t="http://example.com"
         xsi:type="xsd:int" mustUnderstand="1">
           5
       </t:SessionOrder>
   </SOAP-ENV:Header>
   <SOAP-ENV:Body>
       <GetStockQuote
         xmlns="http://someexample.com">
           <Price>MSFT</Price>
       </GetStockQuote>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

### REST

Beginners can assume a REST API means an HTTP service that can be called using standard web libraries and tools using JSON payloads.

More info: https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/

Comparison of SOAP vs REST: https://www.upwork.com/hiring/development/soap-vs-rest-comparing-two-apis/

#### How to use REST API Example

Software: [Postman](https://www.getpostman.com/)

API Provider: [thetvdb.com](https://www.thetvdb.com/)

API docs: https://api.thetvdb.com/swagger

API base url: `https://api.thetvdb.com`

##### Login

POST `/login`

Body:

```json
{
  "apikey": "MW5TK02DUDMSH9A4",
  "username": "mega.boichetq",
  "userkey": "UA27FF66EENM8BSR"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTM3ODQyNTgsImlkIjoiIiwib3JpZ19pYXQiOjE1NTM2OTc4NTgsInVzZXJpZCI6NTEzNDk3LCJ1c2VybmFtZSI6Im1lZ2EuYm9pY2hldHEifQ.izEns8bjBUI6MHAPlVhWxfti-Ynyx6VxZbGnvTXONcPq-lW6R0ojGYtBUNs04SF4QYyPcn06lm5z9dmxs83Av3-ZdM6y-aeunuvY_ioy4VXpzJw5L_CiPmmQUTTGnHEAzJRlZodU18TGwMB_hAxwvEJD_BN1nhafU5ZvW43kL4KVh4PyG1N7Gh-ZZsPcKZRzI3nCIHVkfcp6RkNannbnABeAnLguDjvwfhOz3SQQtNfhc9WN0-OFrnP_IfpKJnQxGo0v7FxP8oSmFHCUqigDf8qlsMPJ3LfKJ7mB8AeN0Hh_q-oRU5Jnl-E-RZpPHLqeveTJcTIjfk-44V9SVHk3ow"
}
```

##### Search

GET `search/series`

Headers:

- **Authorization**: Bearer XXXX...XXXX

Query:

`?slug=one-piece`

Response:

```json
{
  "data": [
    {
      "aliases": [],
      "banner": "graphical/81797-g2.jpg",
      "firstAired": "1999-10-20",
      "id": 81797,
      "network": "Fuji TV",
      "overview": "It was a time when pirates ruled the seas. Several bands of pirates were battling over the great hidden treasure, One Piece, which was left by the now legendary pirate captain, Gold Roger. There was a young boy who admired the pirates, his name was Monkey D. Luffy. One day, he mistakenly eats the devil's fruit and turns himself into a rubber human being.\r\n\r\nTen years have passed since that incident. Luffy sets out to sail all alone. He sets out to become a great pirate captain and that's when his great adventure begins. \"I'm going to be the Pirate King! I'm going to get One Piece!\".",
      "seriesName": "One Piece",
      "slug": "one-piece",
      "status": "Continuing"
    }
  ]
}
```

#### REST is a set of rules and recommendations, not actually a protocol.

REST determines how the API looks like. It stands for “Representational State Transfer”. It is a set of rules that developers follow when they create their API.

Using different HTTP methods:

- `POST` - create new resource
- `GET` - read (fetch) resource
- `PUT` and `PATCH` - update resource
- `DELETE` - remove resource

Often abbreviated as CRUD - Create, Read, Update, Delete

Url schemas:

- POST `/users/` with payload `{ "name": "alex", "age": 34 }` creates new user with name `alex`.
- GET `/users/alex` - returns user information for user with name `alex`
- PUT `/users/alex` with payload `{ "age": 35 }` updates age for user `alex`
- GET `/users/alex/repos` - returns all repositories for user `alex`

### GraphQL

> [GraphQL](https://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

Main differences from REST:

- You query your data with special GraphQL syntax instead of bogus urls and body parameters.
- You can retrieve only required of fields of objects, no need to download unnecessary data.
- Combining several queries in one request.
- API schema and documentation are integrated thanks to GraphQL tooling and infrastructure.

GraphQL query

```
author(id: "7") {
  id
  name
  avatarUrl
  articles(limit: 2) {
    name
    urlSlug
  }
}
```

GraphQL query result

```json
{
  "data": {
    "author": {
      "id": "7",
      "name": "Robin Wieruch",
      "avatarUrl": "https://domain.com/authors/7",
      "articles": [
        {
          "name": "The Road to learn React",
          "urlSlug": "the-road-to-learn-react"
        },
        {
          "name": "React Testing Tutorial",
          "urlSlug": "react-testing-tutorial"
        }
      ]
    }
  }
}
```

## HTTP API Summary

- HTTP is a main transport protocol for the internet. It is widely used for every application: mobile, desktop, embedded or web.

- HTTP APIs is a way of communications between applications, devices and services.

- SOAP is a quite old and hard to use protocol. But it is still used in enterprises.

- Most of modern APIs use various JSON over HTTP implementation more or less REST compliant.

- GraphQL is a new way of writing and designing APIs which is using special query language to request data and provides JSON as output.
