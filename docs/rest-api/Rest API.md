# API Architectures

After performing authentication, the request reaches the view layer of the application.

- The view layer retrieves all the parameters from request, path, headers, etc. and pass it to the controller layer unmodified/untouched.

- The controller layer performs the error handling.

- The controller layer retrieves the input as arguments, performs validation on the inputs.

- The controller layer pass in the validated input to the service layer.

- The service layer performs the logic (do the parameter optimization if possible) and sends the parameters to Repo layer.

- The service layer handles the edge cases but no error handling.

- The repo layers return entity objests to service layers.

- The service layers takes the entity objects and put them together as plain JS objects.

- The service layer returns the plain JS object to the controller.

- The controller takes the JS objects and converts it into a DTO object.

- The controller passes the object to the Filter layer to only include the keys/attributes as requested by the client (For improves speed)

- The controller serializes the DTO object as JSON string.

- The controller sends a response object to the view

- The view returns the response object untouched.


 # Terminology:

- Data Transfer Object (DTO): The payload object with only data. (Can be serialized into and from JSON string)

- JS Object: Plain JS object with data and methods.

- Data Entity Object (or DAO): The object that represents a single row in a database table (should be a flat object with keys corresponding to column names)

- View: The "exposed" layer that shows all the endpoints and forwards the request to controller (Should just return the string received from controller)

- Controller: The REST/API layer that performs input validation, error handling, etc. (All methods must limit themselves to return a object serialzied as JSON string)

- Service: The Business logic layer that prepares the input for the Repository Layer (All methods must limit themselves to return a plain JS Object)

- Repository: The CRUD layer that returns data based on input. (All methods must limit themselves to return a Data Entity Object)

- Mapper: An intermediary that can convert a JSON Object to/from Entity/DTO object