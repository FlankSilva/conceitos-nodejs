const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    liks: 0,
  }

  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(r => r.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repositóry not fond' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryExist = repositories.find(r => r.id === id)

  if(!repositoryExist) {
    return response.status(400).json({ error: 'Repositóry not fond'  })
  }

  repositories.splice(id, 1)

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repository = repositories.find(r => r.id === id)

  if(!repository) {
    return response.status().json({ error: 'Repositóry not fond' })
  }

  repository.liks += 1

  return response.json(repository)
});

module.exports = app;
