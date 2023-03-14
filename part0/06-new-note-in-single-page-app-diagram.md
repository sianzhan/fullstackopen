# New note in Single page app diagram

#### Diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser appends the new note to the notes list, performs a whole list re-render, <br />and then sends the new note to server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br/> with payload {"content": "new note", "date": "2023-1-1" }
    activate server

    Note left of server: The server processes the request (adding the new note to the list), <br />then returns an acknowledgement message back to the browser
    server-->>browser: {"message": "note created"}
```