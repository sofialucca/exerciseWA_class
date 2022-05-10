# `react-score-server`

The `react-score-server` is the server-side app companion of `react-scores`. It presents some APIs to perform CRUD operations on a student's university exams.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List of all exams__

URL: `api/exams`

HTTP Method:GET.

Description: Get all exams that student already passed.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
    {
        "code":"01abc",
        "name":"W3b Application 1",
        "credits": 6,
        "score": 30,
        "laude": true,
        "date": "2022-06-03"
    },
    {
        "code":"02def",
        "name":"How to pass exams",
        "credits": 3,
        "score": 18,
        "laude": fasle,
        "date": "2021-09-15"
    },
    ...
]
```

### __Add a new exams__

URL: `api/exams`

HTTP Method:PUT.

Description: Add new passed exam in DB.

Request body: 
```
    {
        "code":"01abc", //only add the code because we have separated table for courses and scores, so we can retrieve info from other table
        "score": 30,
        "laude": true,
        "date": "2022-06-03"        
    }

```

Response: `201 Created` (success) or `503 Service unavailable` (generic error) or `422 Unprocessable entity`.

Response body: _None_

### __Update an exam__

URL: `api/exams/<code>`

HTTP Method: PUT.

Description: Modify a passed exam in DB.

Example:  `api/exams/01abc`

Request body: 
```
    {
        "code":"01abc", 
        "score": 30,
        "laude": true,
        "date": "2022-06-03"        
    }

```

Response: `200 OK` (success) or `503 Service unavailable` (generic error) or `422 Unprocessable entity`.

Response body: _None_.

### __Delete an existing exam__

URL: `api/exams/<code>`

HTTP Method: DELETE.

Description: Delete an existing exam in DB.

Example:  `api/exams/01abc`

Request body: _None_

Response: `204 No content` (success) or `503 Service unavailable` (generic error) or `404 Not found`.

Response body: _None_.