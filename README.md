# La Promptothèque

La Promptothèque est une plateforme SaaS pour gérer, tester et automatiser des prompts IA. 
Elle offre une bibliothèque searchable, un playground avancé, du versioning, des analytics, et des intégrations (API/webhooks) pour les équipes et les individus.

## Architecture Modulaire

Le projet suit une architecture de monolithe modulaire.

- `modules/prompts/` : Bibliothèque, recherche, versioning.
- `modules/playground/` : Essais, comparaison de modèles.
- `modules/workflows/` : Automatisations, API, webhooks.
- `modules/analytics/` : Logs et statistiques d'utilisation.

## Instructions IA (Agent-Ready)

Les règles de comportement de l'IA (Claude) et le workflow de développement (`Explore-Plan-Code-Verify`) se trouvent dans le dossier `.agent/`.

## CI/CD & Sécurité

Ce projet intègre une analyse de sécurité sémantique automatisée sur chaque Pull Request (via Anthropic Claude). 
**Important :** Configurez le secret `CLAUDE_API_KEY` dans les paramètres du dépôt GitHub pour activer l'analyse.
