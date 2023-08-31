const express = require("express");
const router = express.Router();

//middleware
const  {auth,adminCheck} =require("../middleware/auth") 

const {
  register,
  login,
  logout,
  currentUser,
  listUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");
//@Endpoint localhost:5000/api/regiter
//2method   POST
//@access   public
router.post("/regiter", register);

//@Endpoint localhost:5000/api/login
//2method   POST
//@access   public
router.post("/login", login);

//@Endpoint localhost:5000/api/logout
//2method   POST
//@access   public
router.post("/logout", logout);


//@Endpoint  http://localhost:5000/api/current-user
//@Method    POST
//@Access    Private
router.post("/current-user", auth, currentUser);
//@Endpoint  http://localhost:5000/api/current-admin
router.post("/current-admin", auth,adminCheck, currentUser);

//@Endpoint localhost:5000/api/user
//2method   get
//@access   public
router.get("/user", listUser);

//@Endpoint localhost:5000/api/user
//2method   put
//@access   public
router.put("/user",auth,adminCheck, editUser);
//@Endpoint localhost:5000/api/user
//2method   delete
//@access   public
router.delete("/user/:id",auth,adminCheck, deleteUser);





module.exports = router;
