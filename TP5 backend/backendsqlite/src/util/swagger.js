const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'swagger_output.json'
const endpointsFiles = ['src/routes/tag.js', 'src/routes/user.js', 'src/routes/router.js']

swaggerAutogen(outputFile, endpointsFiles)
