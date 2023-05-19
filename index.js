const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utilisation de body-parser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Données simulées en mémoire (remplacez cette partie par une base de données réelle dans un scénario de production)
let students = [];

// Route pour créer un nouvel étudiant
app.post('/students', (req, res) => {
  const { id, prenom, nom, age } = req.body;
  
  // Vérification des données requises
  if (!id || !prenom || !nom || !age) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  // Création de l'étudiant
  const newStudent = { id, prenom, nom, age };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// Route pour lister tous les étudiants
app.get('/students', (req, res) => {
  res.json(students);
});

// Route pour modifier un étudiant existant
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { prenom, nom, age } = req.body;

  // Recherche de l'étudiant par ID
  const student = students.find(student => student.id === studentId);

  // Vérification si l'étudiant existe
  if (!student) {
    return res.status(404).send('Étudiant non trouvé.');
  }

  // Mise à jour des données de l'étudiant
  student.prenom = prenom || student.prenom;
  student.nom = nom || student.nom;
  student.age = age || student.age;

  res.json(student);
});

// Route pour supprimer un étudiant existant
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;

  // Recherche de l'index de l'étudiant par ID
  const studentIndex = students.findIndex(student => student.id === studentId);

  // Vérification si l'étudiant existe
  if (studentIndex === -1) {
    return res.status(404).send('Étudiant non trouvé.');
  }

  // Suppression de l'étudiant de la liste
  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.json(deletedStudent);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
