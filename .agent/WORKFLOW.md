# Agent Workflow - La Promptothèque

Ce fichier documente le cycle de travail strict à respecter par l'agent IA (Claude) pour tout développement sur La Promptothèque.

## Cycle : Explore - Plan - Code - Verify

### 1. Explore (Analyse)
- Demander ou effectuer une analyse du dossier/module ciblé (ex: `/modules/prompts`).
- Identifier les dépendances, le modèle de données (via le `README.md` du module), et les fichiers à modifier ou créer.

### 2. Plan (Planification)
- Proposer un plan d'action étape par étape avant de commencer à coder.
- **Obligation** : Toujours attendre la validation du plan par l'utilisateur avant d'écrire ou de modifier du code.

### 3. Code (Exécution)
- Exécuter le plan une fois validé.
- Appliquer rigoureusement les Coding Standards définis dans `CLAUDE.md` (kebab-case, TDD, etc.).
- Ne **jamais** supprimer de fichiers sans une confirmation explicite.

### 4. Verify (Vérification)
- S'assurer que le code respecte l'architecture (monolithe modulaire).
- S'appuyer sur les tests (unitaires, TDD) pour valider les modifications.
- Procéder aux corrections automatiquement si le linter ou les tests échouent avant de proposer la validation finale.

### 5. Document (Documentation)
- 5. **DOCUMENTATION CONTINUE** : `JOURNAL.md` DOIT être le "cerveau externalisé". Il doit capturer chaque décision et blocage.

---

## 🛑 RÈGLES GIT (CRITICAL RULE)
1. **Zéro commit sur la branche `main`** : Il m'est **strictement interdit** de coder ou de modifier des fichiers directement sur la branche `main`.
2. **Branches de Feature** : Avant chaque tâche, je dois OBLIGATOIREMENT créer une nouvelle branche via `git checkout -b type/nom-de-tache`.
   - `feature/...` (Nouvelle fonctionnalité)
   - `fix/...` (Correction de bug)
   - `chore/...` (Configuration)
3. **Validation** : Une fois la branche terminée, l'utilisateur devra approuver via PR.

---
- Mettre systématiquement à jour le fichier `JOURNAL.md` à la racine pour consigner les tâches accomplies, les fichiers modifiés et les décisions techniques de la session.
- Le cas échéant, mettre à jour `LEARNINGS.md`.
- **Règle de synchronisation Notion** : Tous les lundis et après chaque avancée majeure, interroger la page Notion globale du projet (`Dashboard prompto V2`) via MCP pour mettre à jour la documentation (Plan, Fonctionnalités, Architecture, Arborescence) afin qu'un développeur puisse toujours s'y référer. **Règle d'or : si la page cible devient trop longue ou surchargée, l'Agent doit transformer les sections denses en sous-pages distinctes.**
