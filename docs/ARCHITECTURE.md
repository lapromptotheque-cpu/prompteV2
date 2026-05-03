# Documentation Technique - La Promptothèque V2

Ce document décrit l'architecture "Agent-Ready" et le fonctionnement technique de La Promptothèque.

## 1. Architecture Globale (Monolithe Modulaire)
L'application est construite sur **Next.js** (App Router) en tant que framework Full-Stack, et organisée de manière modulaire dans le dossier `/modules/`.
- `modules/prompts/` : Gestion des prompts (CRUD, exécution).
- `modules/playground/` : Zone d'expérimentation.
- `modules/analytics/` : Statistiques d'utilisation.
- `app/` : L'interface utilisateur globale Next.js (Dashboard).

## 2. Base de Données (Supabase)
Nous utilisons **Supabase** en local pour le développement et l'authentification.
- **Dossier local** : `supabase/` (Créé via `npx supabase init`).
- **Liaison Cloud** : L'environnement local est lié au projet distant `gsirarihnosmwbummflx`.
- **Démarrage** : `npm run db:test:start` lance l'instance locale (port 54322).
- **Seeding** : `npm run db:test:seed` injecte les fausses données via `scripts/seed-test-db.js`.

## 3. Workflow de Collaboration (Git)
Nous utilisons le **Feature Branch Workflow** (Option 2).
- **Règle d'or** : INTERDICTION DE POUSSER SUR `main`.
- **Méthode de travail** : Créer une branche pour chaque tâche (`git checkout -b feature/nom`).
- **Validation** : Les fusions vers `main` se font EXCLUSIVEMENT via des **Pull Requests** sur GitHub.
- **Garde-fous de l'Agent IA** : Le fichier `.agent/WORKFLOW.md` contient des instructions strictes empêchant l'IA de coder sur `main`.

## 4. Tests
- **Tests Unitaires (Vitest)** : Rapides, configurés via `vitest.workspace.js`. Commande : `npm run test:unit`.
- **Tests End-to-End (Playwright)** : Simulation du navigateur, gère le multi-onglets. Commande : `npm run test:e2e`.

## 5. Résumé des Commandes NPM Utiles
- `npm run dev` : Lance l'application Next.js.
- `npm run db:test:start` : Allume Supabase en local.
- `npm run db:test:seed` : Remplit la base Supabase avec des données de test.
- `npm run dashboard` : Met à jour le Dashboard Notion.
