# Portfolio Web - Yan Fred NJOMANI SONTA

## 📋 Vue d'ensemble

Portfolio web moderne et dynamique créé pour Yan Fred NJOMANI SONTA, étudiant analyste statisticien et data scientist à l'ENSEA (École Nationale Supérieure de Statistiques et d'Économie Appliquée), Côte d'Ivoire.

**Date de création:** 10 Octobre 2025

## 🎯 Objectif du Projet

Présenter de manière professionnelle et attractive :
- Le parcours académique d'excellence (boursier d'État Camerounais)
- Les compétences techniques en statistiques, data science et machine learning
- Les projets réalisés (7 projets majeurs)
- Les expériences professionnelles et extra-scolaires
- Les coordonnées et moyens de contact

## 🏗️ Architecture du Projet

### Structure des Fichiers
```
.
├── index.html          # Structure HTML principale
├── styles.css          # Styles CSS avec animations avancées
├── script.js           # JavaScript pour interactions et animations
├── server.py           # Serveur web Python (port 5000)
├── .gitignore          # Fichiers à ignorer par Git
└── replit.md           # Documentation du projet
```

## 🎨 Fonctionnalités Principales

### 1. **Hero Section** (Page d'accueil)
- Animation de texte typing avec rotation de titres professionnels
- Effet parallax sur l'image de profil
- Particules animées en arrière-plan
- Boutons CTA vers projets et contact
- Liens sociaux (LinkedIn, GitHub, Email)

### 2. **Section À Propos**
- Présentation du profil professionnel
- Timeline interactive de la formation académique
  - ENSEA (2023-2026) - Cycle Analyste Statisticien
  - Université de Dschang (2021-2023) - Licence 2 Mathématiques
  - Baccalauréat Scientifique - Mention Bien
- Statistiques clés (bourses, langues, nationalité)

### 3. **Section Compétences**
- 4 catégories de compétences avec barres de progression animées:
  - Statistiques & Économétrie
  - Machine Learning & Data Science
  - Data Visualisation & Reporting
  - Programmation & Bases de données
- Certifications IBM (Python & R for Data Science)

### 4. **Section Projets** (7 projets)
1. **Churn Prediction with Machine Learning** - Prédiction du taux de désabonnement
2. **ACP et ACM with Python** - Analyse multidimensionnelle
3. **Projet d'Analyse Économétrique** - Modèles de régression avancés
4. **Application VBA Excel** - Suivi des tâches
5. **Dashboard PowerBI** - Performance plantation agricole
6. **Application Flask (Convivialité CEMAC)** - Assistant financier IA
7. **Analyse Commerce Afrique Subsaharienne** - Projet fin d'année ENSEA

### 5. **Section Expérience**
- Stage DESPS (Direction des Études, Stratégies, Planification et Statistiques)
- Directeur Marketing - ENSEA Junior Services (EJS)
- Secrétaire Général - ENSEA Data Science Club (EDSC)
- Enseignant de mathématiques à domicile

### 6. **Section Contact**
- Formulaire de contact fonctionnel avec validation
- Informations de contact (email, téléphone, réseaux sociaux)
- Effet de succès/erreur sur soumission du formulaire

## 💻 Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Animations avancées, Grid, Flexbox, Variables CSS
- **JavaScript (ES6+)** - Vanilla JS pour toutes les interactions

### Backend
- **Python 3.11** - Serveur web simple
- **HTTP Server** - Serveur de développement sur port 5000

### Librairies Externes
- **Font Awesome 6.4.0** - Icônes
- **Google Fonts** - Typographie (Poppins, JetBrains Mono)

## 🎨 Design et Animations

### Palette de Couleurs
- **Primary:** `#00d4ff` (Cyan)
- **Secondary:** `#0099cc` (Bleu)
- **Accent:** `#ff6b35` (Orange)
- **Background:** `#0a0e27` (Bleu foncé)
- **Cards:** `rgba(26, 31, 58, 0.8)` (Semi-transparent)

### Animations Implémentées
- ✅ Typing effect avec rotation de textes
- ✅ Scroll animations (fade-up, fade-left, fade-right, zoom-in)
- ✅ Progress bar de défilement
- ✅ Navigation sticky avec effet scrolled
- ✅ Barres de progression des compétences animées
- ✅ Effets parallax sur hero section
- ✅ Particules flottantes animées
- ✅ Hover effects sur cards et boutons
- ✅ Micro-interactions sur éléments cliquables

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints à 768px
- ✅ Menu hamburger pour mobile
- ✅ Grids adaptatives
- ✅ Typographie responsive

## 🚀 Configuration et Déploiement

### Workflow Configuré
- **Nom:** Server
- **Commande:** `python3 server.py`
- **Port:** 5000
- **Type:** webview
- **Cache Control:** Désactivé pour mises à jour immédiates

### Lancement du Serveur
```bash
python3 server.py
```

Le site sera accessible sur `http://0.0.0.0:5000`

## 📝 Informations de Contact (Portfolio)

- **Email:** fred.njomani@ensea.edu.ci
- **Téléphone:** +225 01 53 73 60 70
- **LinkedIn:** https://bit.ly/46DIB7P
- **GitHub:** https://github.com/Fred-Sonta

## 🔄 Modifications Récentes

**10 Octobre 2025:**
- ✅ Création de la structure HTML complète avec 6 sections principales
- ✅ Développement du CSS avec animations avancées et design moderne
- ✅ Implémentation JavaScript pour toutes les interactions
- ✅ Configuration du serveur Python sur port 5000
- ✅ Ajout de 7 projets dans la section projets
- ✅ Timeline interactive de la formation
- ✅ Formulaire de contact avec validation côté client et serveur
- ✅ Backend API REST pour enregistrer les messages de contact (/api/contact)
- ✅ Stockage des messages dans un fichier JSON (messages/contacts.json)
- ✅ Design 100% responsive
- ✅ Effets parallax et particules animées
- ✅ Serveur configuré avec allow_reuse_address pour éviter les conflits de port

## 🎯 Prochaines Améliorations Possibles

- [ ] Mode sombre/clair avec switch toggle
- [ ] Graphiques D3.js pour visualiser les compétences
- [ ] Section blog pour articles techniques
- [ ] Galerie de visualisations de données interactives
- [ ] Système de téléchargement du CV en PDF
- [ ] Integration avec un backend pour le formulaire de contact
- [ ] Animations Three.js pour un effet 3D
- [ ] Section témoignages/recommandations

## 📚 Ressources

- Police principale: Poppins (Google Fonts)
- Police code: JetBrains Mono (Google Fonts)
- Icônes: Font Awesome 6.4.0
- Design inspiré: Data Science & Analytics moderne

## ⚙️ Variables d'Environnement

Aucune variable d'environnement requise pour ce projet statique.

## 🔒 Sécurité

- Pas de données sensibles exposées
- Formulaire de contact avec validation côté client
- Cache désactivé pour fraîcheur des contenus
- Serveur configuré pour écouter sur 0.0.0.0:5000

---

**Développé avec passion pour mettre en valeur l'excellence académique et professionnelle de Yan Fred NJOMANI SONTA** 🚀
