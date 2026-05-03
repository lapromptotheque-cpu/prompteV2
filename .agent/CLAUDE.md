# La Promptothèque - Agent Instructions

## Project Summary
La Promptothèque est une plateforme SaaS pour gérer, tester et automatiser des prompts IA. Elle offre une bibliothèque searchable, playground avancé, versioning, analytics, et intégrations (API/webhooks), pour équipes et individus boostant productivité IA avec 38 features sécurisées (de biblio à autoscaling).

## Architecture Map
```text
La Promptothèque/
├── .agent/
│   ├── CLAUDE.md
│   └── WORKFLOW.md
├── docs/
│   └── adr/
├── modules/
│   ├── prompts/
│   ├── playground/
│   ├── workflows/
│   └── analytics/
├── README.md
└── ... (src/, tests/)
```

## Coding Standards

### Conventions de nommage
- Fichiers et fonctions : `kebab-case` (ex: `prompt-library.ts`)
- Variables : `camelCase` (ex: `userPrompts`)
- Constantes : `UPPER_SNAKE_CASE` (ex: `MAX_PROMPT_LENGTH`)
> Évitez les abréviations, gardez une clarté maximale pour la compréhension des agents IA.

### Types de Tests
- **TDD prioritaire** : Écrivez les tests avant le code (happy path pour le playground, edge cases pour le versioning).
- **Unitaires (Jest/Vitest)** : Couvrir >80% des modules (ex: `modules/prompts`).
- **Intégration** : Pour les workflows API/webhooks.
- **E2E** : Pour les essais dans le playground (Cypress, v2).

## Structure des Dossiers
Les modules doivent être isolés, chacun ayant son propre `README.md` (décrivant ses responsabilités, ses entrées/sorties et son schéma DB).
```text
modules/
├── prompts/     # Biblio, recherche, versioning
│   ├── README.md
│   └── src/
├── playground/  # Essais, comparaison
├── workflows/   # Automatisations, API
└── analytics/   # Logs, stats
tests/           # Unitaires par module
```

## Workflow Rules (Règles de comportement)
1. **Toujours créer un plan avant de coder.**
2. **Ne jamais supprimer de fichiers sans demander.**
3. **Utiliser les tests existants pour vérifier le code avant de confirmer.**

### Cycle de travail recommandé (Explore-Plan-Code-Verify)
- **Explore** : Analyser le dossier cible (ex: "Analyse le dossier /modules/prompts, quels fichiers dois-je modifier pour ajouter la fonction Y ?")
- **Plan** : "Propose un plan étape par étape avant de commencer." (Attendre la validation).
- **Code** : "Exécute le plan."
- **Verify** : "Vérifie avec les tests."

## Commands (À configurer)
- Tests : `npm run test`
- Linter : `npm run lint`
- Démarrage : `npm run dev`
