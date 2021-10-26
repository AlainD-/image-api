# Image API

Node project API to resize images and/or get resized/thumbnails of images.
You can use the `images` API below as a placeholder for your image in HTML.

For instance,

```html
<img src="http://<my-server>/api/v1/images?filename=autumn-1.jpg&width=200">
```

This application is powered with `NodeJS` and `Express`. The API uses `Sharp` to convert and resize the images.

## Installation

Execute `npm install` or `npm i` from the root folder in order to install the required packages.

## Run

You can start the server by running `npm start`. By default the server tries to run on the port 3000.

To specify a different port for the server, create a `.env` file in the root folder which contain the setting of the new port. For instance to run the server on the port `3002`, write in the `.env` file

```bash
PORT=3002
```

## Tests

Run in the console `npm test` to execute the test. Tests are powered with Jasmine.

## API

* `/api/v1/libraries`
  * `GET /api/v1/libraries`
    * **params**: None
    * **response**:
      * `200`: an array of string. The response contains the list of available images on the server
* `/api/v1/images`
  * `GET /api/v1/images`
    * **params**
      * `filename`: mandatory. The name of the image to get
      * `width`: optional. The width of the image to resize to
      * `height`: optional. The height of the image to resize to
      * note: if both width and height are specified, the thumbnail returned will be resized at these exact dimensions without keeping the original ratio of the image. To keep the original ratio of the image for a thumbnail, specify only either width or heigth
    * **response Header**
      * `X-Filename`: The custom header `X-Filename` is included in the reponse header with the name of the image or thumbnail as a value
    * **response**:
      * `200`: The thumbnail of the image at the specified dimension(s). If neither width nor height is provided, the original image is returned. If there is already an existing thumbnail created for the provided dimension(s) in the cache, that cached thumbnail is returned
    * **errors**:
      * `400`: If the query parameter `filename` is not specified
      * `404`: If the image specified by `filename` does not exist
      * `500`: If an unexpected error occured during the creation of the thumbnail

## Authors

* **Alain D'EURVEILHER** - *Initial work* - [AlainD.](https://github.com/AlainD-)
