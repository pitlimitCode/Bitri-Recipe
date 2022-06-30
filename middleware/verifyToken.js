const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      next()
    }
  })
};
module.exports = { checkToken };


  // try {
  //   const token = req.headers?.authorization;
  //   const decoded = jwt.verify(
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc4LCJuYW1lIjoidGVzMyIsImVtYWlsIjoidGVzQDMiLCJwaG9uZV9udW1iZXIiOjk5OTkzLCJwYXNzd29yZCI6IiQyYiQwNSRQOEF0NG1tYTVQbTVBSFdSLzR3eEFlZG1IdUhGaFZUTWhuVWxtOXRBVm9TTW9ZTTFHLkYvQyIsImF2YXRhciI6ImltYWdlc1xcdXNlcnNfYXZhdGFyXFxhdmF0YXJfSWQxNzguanBlZyIsImlhdCI6MTY1NjQ0MzkxMCwiZXhwIjoxNjU2NDQzOTMwfQ.lha3ershOwXepW5J6JP0ail2R2f7zQCaMWYcKfiNk2k"
  //     );
  //     token?.substring(process.env.JWK_KEY, token?.length),

      
  //     console.log(decoded);
      

  //   if (decoded) {
  //     next();
  //   }
  // } catch (error) {
  //   res.status(401).send("token tidak valid");
  // }