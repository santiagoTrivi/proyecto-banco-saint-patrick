
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "User login",
          "description": "With this endpoint, the user can login providing their username number and their password, which is encrypted in the database",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AuthenticationTokens"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/client": {
        "post": {
          "operationId": "AuthController_register",
          "summary": "Register client",
          "description": "Endpoint to create a client with an unique username",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterClientDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AuthenticationTokens"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DataValidationErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/clientInfo": {
        "get": {
          "operationId": "AuthController_getclient",
          "summary": "Get full authenticated client info",
          "description": "With this endpoint, the user coud retrive their information once they login",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateClientDto"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/refresh-tokens": {
        "post": {
          "operationId": "AuthController_refreshTokens",
          "summary": "Refresh access_token",
          "description": "to obtain additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires",
          "parameters": [],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RefreshToken"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "403": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ForbiddenErrorResponseChema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "summary": "Logout implementation",
          "description": "log a user out of the session and invalite the refresh token",
          "parameters": [],
          "responses": {
            "201": {
              "description": "logged out successfully"
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/client/{id}": {
        "patch": {
          "operationId": "ClientController_update",
          "summary": "Update Client data",
          "description": "For any client data. password updata allowed for now",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UdpateClientDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "client"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/card": {
        "post": {
          "operationId": "CardController_addCard",
          "summary": "Register a new card",
          "description": "This endpoint allows clients to create a new card, automatically generating a unique card_number to make any kind of movement. keep in mind, that the maximun number of cards allowed is 3 per client.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCardDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CardDto"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DataValidationErrorResponseSchema"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "card"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/card/{id}": {
        "get": {
          "operationId": "CardController_getCard",
          "summary": "Find card by id",
          "description": "find the full card data ",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CardDetail"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "card"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "CardController_update",
          "summary": "Update Card data",
          "description": "For any card data. PIN updata allowed for now",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UdpateCardDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "card"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/currency": {
        "post": {
          "operationId": "CurrencyController_register",
          "summary": "Register currency",
          "description": "Endpoint to create currencies including the name, code, symbol and more. just for sistem admin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCurrencyDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CurrencyObjectData"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DataValidationErrorResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "currency"
          ]
        },
        "get": {
          "operationId": "CurrencyController_getAll",
          "summary": "Get all the available currencies",
          "description": "This endpoint allows the client to know available the currencies in our system",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CurrencyObjectData"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "currency"
          ]
        }
      },
      "/movement": {
        "post": {
          "operationId": "MovementController_create",
          "summary": "Create Movement",
          "description": "This endpoint allows authenticated user create movement, either deposit or transference using any card",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MovementDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreatedMovementResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DataValidationErrorResponseSchema"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "movement"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/movement/{cardId}": {
        "get": {
          "operationId": "MovementController_getPaginationmmovement",
          "summary": "Get paginated Movements",
          "description": "This endpoint allows authenticated user to get their card movement, providing the paginated data",
          "parameters": [
            {
              "name": "cardId",
              "required": true,
              "in": "path",
              "description": "ID of the card",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "until",
              "required": false,
              "in": "query",
              "description": "to obtain data up to a maximum date",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "description": "to obtain data from a minimum date",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HistoryMovementDto"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedResponseSchema"
                  }
                }
              }
            },
            "500": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorSchema"
                  }
                }
              }
            }
          },
          "tags": [
            "movement"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "API Documentation for bank process",
      "description": "The cats API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "auth",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "LoginDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password"
          ]
        },
        "AuthenticationTokens": {
          "type": "object",
          "properties": {
            "expireIn": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            },
            "refresh_token": {
              "type": "string"
            },
            "refreshExpireIn": {
              "type": "string"
            }
          },
          "required": [
            "expireIn",
            "access_token",
            "refresh_token",
            "refreshExpireIn"
          ]
        },
        "UnauthorizedResponseSchema": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string",
              "example": "Unauthorized",
              "description": "Error message"
            },
            "error": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "InternalServerErrorSchema": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string",
              "example": "INTERNAL_SERVER_ERROR",
              "description": "Error message"
            },
            "error": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "RegisterClientDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "username",
            "password"
          ]
        },
        "DataValidationErrorResponseSchema": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "error": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "CurrencyObjectData": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "isAvailable": {
              "type": "boolean"
            },
            "flag_link": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "name",
            "code",
            "symbol",
            "isAvailable",
            "flag_link"
          ]
        },
        "CardDetail": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "clientId": {
              "type": "string"
            },
            "card_number": {
              "type": "string"
            },
            "PIN": {
              "type": "string"
            },
            "current_balance": {
              "type": "number"
            },
            "currency": {
              "$ref": "#/components/schemas/CurrencyObjectData"
            },
            "isActive": {
              "type": "boolean"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "clientId",
            "card_number",
            "PIN",
            "current_balance",
            "currency",
            "isActive",
            "createdAt",
            "updatedAt"
          ]
        },
        "CreateClientDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "object"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "isActive": {
              "type": "boolean"
            },
            "cards": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CardDetail"
              }
            },
            "refreshToken": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "id",
            "firstName",
            "lastName",
            "username",
            "password",
            "isActive",
            "cards",
            "refreshToken",
            "createdAt",
            "updatedAt"
          ]
        },
        "NotFoundErrorResponseSchema": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string"
            },
            "error": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "RefreshToken": {
          "type": "object",
          "properties": {
            "expireIn": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            }
          },
          "required": [
            "expireIn",
            "access_token"
          ]
        },
        "ForbiddenErrorResponseChema": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string",
              "example": "Access Denied"
            },
            "error": {
              "type": "string",
              "example": "Forbidden"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "UdpateClientDto": {
          "type": "object",
          "properties": {
            "newPassword": {
              "type": "string"
            },
            "currentPassword": {
              "type": "string"
            },
            "confirmPassword": {
              "type": "string"
            }
          },
          "required": [
            "newPassword",
            "currentPassword",
            "confirmPassword"
          ]
        },
        "CreateCardDto": {
          "type": "object",
          "properties": {
            "PIN": {
              "type": "string"
            },
            "currencyId": {
              "type": "string"
            }
          },
          "required": [
            "PIN",
            "currencyId"
          ]
        },
        "CardDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "clientId": {
              "type": "string"
            },
            "card_number": {
              "type": "string"
            },
            "PIN": {
              "type": "string"
            },
            "current_balance": {
              "type": "number"
            },
            "currency": {
              "type": "string"
            },
            "isActive": {
              "type": "boolean"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "clientId",
            "card_number",
            "PIN",
            "current_balance",
            "currency",
            "isActive",
            "createdAt",
            "updatedAt"
          ]
        },
        "UdpateCardDto": {
          "type": "object",
          "properties": {
            "currentPIN": {
              "type": "string"
            },
            "newPIN": {
              "type": "string"
            },
            "confirmPIN": {
              "type": "string"
            }
          },
          "required": [
            "currentPIN",
            "newPIN",
            "confirmPIN"
          ]
        },
        "CreateCurrencyDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "flag_link": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "code",
            "symbol",
            "flag_link"
          ]
        },
        "CreateMovementDto": {
          "type": "object",
          "properties": {
            "cardId": {
              "type": "string"
            },
            "toCard": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "concept": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "default": "TRANSFERENCE"
            },
            "PIN": {
              "type": "string"
            }
          },
          "required": [
            "cardId",
            "amount",
            "concept",
            "type",
            "PIN"
          ]
        },
        "CreateMovementDepositDto": {
          "type": "object",
          "properties": {
            "cardId": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "concept": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "default": "DEPOSIT"
            },
            "PIN": {
              "type": "string"
            }
          },
          "required": [
            "cardId",
            "amount",
            "concept",
            "type",
            "PIN"
          ]
        },
        "MovementDto": {
          "type": "object",
          "properties": {
            "Movement": {
              "type": "array",
              "items": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/CreateMovementDto"
                  },
                  {
                    "$ref": "#/components/schemas/CreateMovementDepositDto"
                  }
                ]
              }
            }
          },
          "required": [
            "Movement"
          ]
        },
        "createdMovementDepositDto": {
          "type": "object",
          "properties": {
            "cardId": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "concept": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "default": "DEPOSIT"
            },
            "PIN": {
              "type": "string"
            },
            "currencyId": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "cardId",
            "amount",
            "concept",
            "type",
            "PIN",
            "currencyId",
            "createdAt",
            "updatedAt"
          ]
        },
        "createdMovementTransferenceDto": {
          "type": "object",
          "properties": {
            "cardId": {
              "type": "string"
            },
            "toCard": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "concept": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "default": "TRANSFERENCE"
            },
            "PIN": {
              "type": "string"
            },
            "currencyId": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "cardId",
            "amount",
            "concept",
            "type",
            "PIN",
            "currencyId",
            "createdAt",
            "updatedAt"
          ]
        },
        "CreatedMovementResponseDto": {
          "type": "object",
          "properties": {
            "Movement": {
              "type": "array",
              "items": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/createdMovementDepositDto"
                  },
                  {
                    "$ref": "#/components/schemas/createdMovementTransferenceDto"
                  }
                ]
              }
            }
          },
          "required": [
            "Movement"
          ]
        },
        "DetailedMovement": {
          "type": "object",
          "properties": {
            "cardId": {
              "type": "string"
            },
            "toCard": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "concept": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "default": "TRANSFERENCE"
            },
            "PIN": {
              "type": "string"
            },
            "currencyId": {
              "$ref": "#/components/schemas/CurrencyObjectData"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "cardId",
            "amount",
            "concept",
            "type",
            "PIN",
            "currencyId",
            "createdAt",
            "updatedAt"
          ]
        },
        "HistoryMovementDto": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/DetailedMovement"
              }
            },
            "totalItems": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "currentPage": {
              "type": "number"
            },
            "from": {
              "format": "date-time",
              "type": "string"
            },
            "until": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "data",
            "totalItems",
            "totalPages",
            "currentPage",
            "from",
            "until"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
