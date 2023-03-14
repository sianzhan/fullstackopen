# New note diagram

#### Diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note<br/> with payload {"note": "new note" }
    activate server
    
    Note left of server: The server processes the request (adding the new note to the list), then returns a response back to the browser
    server-->>browser: Ask browser to perform URL redirection to location /exampleapp/notes
    deactivate server

    Note right of browser: The browser starts redirecting to location of /exampleapp/notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [..., {"content":"new note","date":"2023-02-23T22:09:29.200Z"}]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes (including the new note)
```