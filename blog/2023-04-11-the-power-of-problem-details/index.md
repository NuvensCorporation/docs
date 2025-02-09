---
title: The Power of Problem Details for HTTP APIs
authors: nate
tags: [ts, api, problems]
description: Better API errors with the Problem Details standard
image: https://og-image.zuplo.com/?text=Better%20API%20errors%20with%20the%20Problem%20Details%20standard
---

```
HTTP/1.1 403 Forbidden
```

We've all seen it. Whether in a browser or in Postman or in a terminal.

And we all know the drill. You start checking your credentials and your permissions. You maybe try a GET instead of a POST, and, of course, you try exactly what you tried the first time around in case you've magicked it fixed somehow.

You have to do all of this because just telling you 'Access Forbidden' isn't that helpful. You can see you don't have access, but 'Forbidden' how?

Some developers add more explicative error responses. But these are ad-hoc, with the format entirely down to that API engineering team. This leads to inconsistency and, most importantly, makes it harder for clients to understand and process the errors. APIs are supposed to be machine-readable interfaces. This lack of standardization makes it difficult for API consumers to programmatically handle different types of errors, potentially leading to more fragile and less interoperable systems.

Step in RFC 7807, Problem Details for HTTP APIs. This is a new IETF standard that helps API developers follow a simple pattern for responding to 'problem' requests. Instead of every developer having to reinvent the wheel, they can use this standard to define the details in each request.

Let's go through the details of the standard and how to implement it easily for your APIs.

## The Art of Telling Bad News

Problem Details are a machine-readable object for expressing errors in HTTP APIs. It helps provide a standardized structure for error responses, making it easier for clients to understand and process the errors.

The main components of a Problem Details object are:

- **type (string, URI)**: A URI that identifies the specific error type. This helps clients understand the error and potentially find more information or documentation about it. Ideally, this URI should be stable and not change over time.
- **title (string)**: A short, human-readable summary of the problem. This should be a brief description that concisely conveys the error. The title should not change for a given "type" URI.
- **status (integer, optional)**: The HTTP status code generated by the origin server for this occurrence of the problem. This helps clients understand the nature of the error and how it relates to the HTTP protocol.
- **detail (string, optional)**: A more detailed, human-readable explanation of the problem. This can include specific information about the error and what might have caused it. The "detail" field is intended to provide context and suggestions to clients on how they might address the problem.
- **instance (string, URI, optional)**: A URI that identifies the specific occurrence of the problem. This can help clients and servers correlate and track individual instances of errors.

Let's say you have a credit-based SaaS tool. Users pay for credits upfront and use them up over time. When a user doesn't have enough credits to access the tool, you might return a '403 Forbidden' status:

```
HTTP/1.1 403 Forbidden
```

But on its own, this falls foul of the problems above. Neither human nor machine knows what the underlying problem is. With Problem Details, we can add a JSON object to the response with the components above:

```json
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}
```

Here we've used:

- **type** set to `https://example.com/probs/out-of-credit`. The client can dereference this URI to provide more general information about this problem.
- **title** set to You do not have enough credit. This gives a user a quick understanding of the specific problem.
- **detail** set to `Your current balance is 30, but that costs 50`. This goes into more detail about the balance of the account here. Immediately, a user will understand why they are forbidden to access this page and what is needed to resolve the issue
- **instance** set to `/account/12345/msgs/abc`. In this case, this will resolve to a log message about the specific instance of the problem. This means a client/user can use this when referencing the issue with the provider.

This set is extensible. Besides the standard fields, Problem Details objects can include custom properties that provide more information about the error. These additional properties can be application-specific and may contain any relevant data that helps clients understand or resolve the error. Here we've added:

- **balance** set to `30`. This tells the client the current balance of the accounts, which can be passed on to a payments portal or to the user to increase their balance.
- **accounts** set to `["/account/12345","/account/67890"]`, telling the client the specific accounts related to this problem. Like instance (and type if needed), these are relative URIs. The client can link through to these accounts.

Here's another example from the RFC:

```json
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
Content-Language: en

{
  "type": "https://example.net/validation-error",
  "title": "Your request parameters didn't validate.",
  "invalid-params": [
    {
      "name": "age",
      "reason": "must be a positive integer"
    },
    {
      "name": "color",
      "reason": "must be 'green', 'red' or 'blue'"
    }
  ]
}
```

This is a good example for two reasons:

1. It only uses the two required fields of the main members, type and title.
1. The invalid-params property gives detailed information about what's needed for this API. This gives the client or user an instant understanding of their error and what's needed to fix.

## Setting up problem details in your own APIs

Let's go through a couple of quick examples of how these can be added to APIs. As the responses are basic JSON, there is nothing special you have to do to set up Problem Details. The main preparation is enumerating your errors so you can set up types (and URIs) and titles for each, alongside any further properties (such as logs) or parameter responses such as in the 400 example above.

To set up a Problem Detail response in TypeScript, you can set up a ProblemDetails interface and then pass it in the body of the status response. Here's an example using express:

```ts
import express, { Request, Response } from "express";

// Define the Problem Details type
interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  balance?: number;
  accounts?: string[];
}

const app = express();
const port = 3000;

app.get("/resource", (req: Request, res: Response) => {
  // Simulate an insufficient credit check
  const hasSufficientCredit = false;

  if (!hasSufficientCredit) {
    const errorDetails: ProblemDetails = {
      type: "https://example.com/probs/out-of-credit",
      title: "You do not have enough credit.",
      status: 403,
      detail: "Your current balance is 30, but that costs 50.",
      instance: "/account/12345/msgs/abc",
      balance: 30,
      accounts: ["/account/12345", "/account/67890"],
    };

    res.status(403).json(errorDetails);
  } else {
    res.json({ message: "Access granted to the resource!" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

Same goes for Python. Here we'll use pydantic to set up the ProblemDetails class with types and server it with FastAPI. The response is sent as a dict to the client:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Define the Problem Details model
class ProblemDetails(BaseModel):
    type: str
    title: str
    status: int
    detail: str
    instance: str = None
    balance: int = None
    accounts: List[str] = None

@app.get("/resource")
async def get_resource():
    has_sufficient_credit = False

    if not has_sufficient_credit:
        error_details = ProblemDetails(
            type="https://example.com/probs/out-of-credit",
            title="You do not have enough credit.",
            status=403,
            detail="Your current balance is 30, but that costs 50.",
            instance="/account/12345/msgs/abc",
            balance=30,
            accounts=["/account/12345", "/account/67890"]
        )

        raise HTTPException(status_code=403, detail=error_details.dict())

    return {"message": "Access granted to the resource!"}
```

## Easing the Pain of API Errors

Josh talked with Erik Wilde, one of the authors of RFC 7807 a few weeks ago about the impetus and implementation of the standard. Check it out here:

<YouTubeVideo url="https://www.youtube-nocookie.com/embed/OOVUxzoWkhQ" />

We recently made problem details the default format for errors on all Zuplo Gateways (overridable of course) to help our customers more easily provide better API errors. Once you start to play with these standards, you can start to see the opportunity available through Problem Details for much more robust APIs. The 'sad path' is one many users will walk, so giving them the guidance needed to find the happy path again is a great developer experience. Problem Details do just that, making your API simply more helpful and better to work with than your competitors.
