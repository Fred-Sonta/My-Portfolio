# Portfolio Web - Yan Fred NJOMANI SONTA

## 🚀 Démarrage Rapide

Le serveur est configuré pour démarrer automatiquement. Le portfolio est accessible à l'URL de votre Replit.

### Lancement manuel
```bash
python3 server.py
```

Le site sera accessible sur `http://0.0.0.0:5000`

## 📋 Fonctionnalités

- ✨ Portfolio moderne et dynamique avec animations
- 📱 100% Responsive (mobile, tablette, desktop)
- 💼 Présentation de 7 projets majeurs
- 📊 Visualisation des compétences avec barres de progression
- 📝 Formulaire de contact fonctionnel avec backend
- 🎯 Timeline interactive de la formation
- 🌐 Liens vers réseaux sociaux (LinkedIn, GitHub)

## 📬 Messages de Contact

Les messages envoyés via le formulaire de contact sont enregistrés dans le fichier :
```
messages/contacts.json
```

### Consulter les messages reçus
```bash
cat messages/contacts.json
```

Ou avec formatage JSON :
```bash
python3 -m json.tool messages/contacts.json
```

Chaque message contient :
- `timestamp` : Date et heure de réception
- `name` : Nom de l'expéditeur
- `email` : Email de l'expéditeur
- `subject` : Sujet du message
- `message` : Contenu du message

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Backend** : Python 3.11
- **Serveur** : HTTP Server (développement)
- **Fonts** : Poppins, JetBrains Mono (Google Fonts)
- **Icons** : Font Awesome 6.4.0

## 📁 Structure du Projet

```
.
├── index.html          # Page principale
├── styles.css          # Styles et animations
├── script.js           # Interactions JavaScript
├── server.py           # Serveur backend Python
├── messages/           # Dossier des messages de contact
│   └── contacts.json   # Messages enregistrés
├── .gitignore         # Fichiers ignorés par Git
├── replit.md          # Documentation détaillée
└── README.md          # Ce fichier
```

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `styles.css` :
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #0099cc;
    --accent-color: #ff6b35;
    /* ... */
}
```

### Ajouter/Modifier des projets
Modifiez la section projets dans `index.html` (ligne ~312)

### Modifier les informations de contact
Mettez à jour les informations dans `index.html` (section contact)

## 📝 Notes Importantes

- Le cache est désactivé pour voir les modifications immédiatement
- Le serveur utilise `allow_reuse_address` pour éviter les conflits de port
- Les messages de contact sont stockés localement (non envoyés par email)

## 📞 Contact

**Yan Fred NJOMANI SONTA**
- Email: fred.njomani@ensea.edu.ci
- Téléphone: +225 01 53 73 60 70
- LinkedIn: https://bit.ly/46DIB7P
- GitHub: https://github.com/Fred-Sonta

---

Développé avec passion pour l'excellence 🚀
