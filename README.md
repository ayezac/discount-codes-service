# discount-codes-service

> A microservice for discount codes

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

   ```
   cd path/to/discount-codes-service
   npm install
   ```

3. Start your app

   ```
   npm start
   ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

# API Documentation

These apis allow you to create an x number of discount codes, fetch a specific one based on its id and fetch multiple discount codes based on the query parameters.

### Authentication

- Authentication in the form of an api-key has been added.

- Add a .env file which contains the values as shown in the .env_example file.
  Add an api-key value to ALLOWED_KEYS i.e. a random string of letters and numbers.

### Brand generates discount codes

##### Method:

`POST `

##### URL:

`/discount-codes `

##### Headers:

```
{
x-access-token: The api-key value added in your .env file as ALLOWED_KEY,

Content-Type: application/json
 }
```

##### Body:

```json
{
  "brand": "nkjf6389ajlrh",
  "codeId": "SUMMER2021",
  "title": "Get 5% off all online purchases",
  "discountAmount": 5,
  "method": "percent_discount",
  "description": "Use this code to get 5% off of all online purchases",
  "numberOfDiscounts": 1000,
  "expiresOn": "2021-12-31"
}
```

##### Data constraints:

- The fields `title`, `method`, `codeId`, `description`, `brand`, `numberOfDiscounts` and `discountAmount` are required fields.
- The field method should be one of the following two string values: `"percent_discount"`or `"fixed_amount"`.
- The field discountAmount must be of type number

##### Success Response:

`Code: 200 OK`

##### Error Responses:

If data is invalid: `Code: 400 BadRequest`

If incorrect API Key or API key not sent in headers: `Code 401 Unauthorized`

If brand that is creating the discount code is invalid: `Code: 405 Method Not Allowed`

### User fetches a discount code

##### Method:

`GET `

##### URL:

`/discount-codes/{discountCodeID}`
discountCodeID = unique id generated when a discount code is created.

- Example:
  `/discount-codes/RdSP5QkibDsp7v1a`

##### Headers:

```
{
x-access-token: The api-key value added in your .env file as ALLOWED_KEY,

userid: One of the three user-ids stored in mock data (since user authentication has not been implemented we send user data (user._id) as a header value),

Content-Type: application/json
 }
```

##### Success Response:

`Code: 200 OK`

##### Error Responses:

If incorrect API Key or API key not sent in headers: `Code 401 Unauthorized`

If user accessing the discount code is invalid: `Code: 405 Method Not Allowed`

If discount code has expired/no longer available: `Code: 400 BadRequest`

### Fetch all brand's discount codes

##### Method:

`GET`

##### URL:

`/discount-codes?brand={brandID}`

- Example based on the mockdata:
  `/discount-codes?brand=nkjf6389ajlrh`

- Results can be further filtered by adding more query parameters
  Example:
  `/discount-codes?brand=nkjf6389ajlrh&tmethod=percent_discount`

##### Headers:

```
{
x-access-token: The api-key value added in your .env file as ALLOWED_KEY,

Content-Type: application/json
 }
```

##### Success Response:

`Code: 200 OK`

##### Error Responses:

If incorrect API Key or API key not sent in headers: `Code 401 Unauthorized`
