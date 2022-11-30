import express from "express";
import router from "./src/routes/index.js";
import cors from 'cors'
import instance from "./src/config/conn.js";


try {
    await instance.authenticate();
    console.log('Conexão com o banco de dados concluida');
  } catch (error) {
    console.error('Erro na conexão com o banco:', error);
}

const app = express()

// app.use(express.json());
app.use(express.json(), cors(), router)

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Conexão iniciada em: http://localhost:${port}`)
})

export default app