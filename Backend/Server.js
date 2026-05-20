import app from "./src/App.js";

const PORT = process.env.PORT || 8080;


app.listen(PORT, (req,res) =>{
    console.log(`Server is running on port || ${PORT}`);
    
})
