# Mémoire du Projet (Learnings)

Ce fichier consigne les apprentissages clés, les erreurs résolues et les patterns découverts tout au long du développement de **La Promptothèque**. L'agent IA doit le mettre à jour à la fin de chaque session de travail importante pour capitaliser sur les connaissances.

## Patterns Validés
- **Architecture** : Monolithe modulaire avec séparation stricte des modules (`prompts`, `playground`, `workflows`, `analytics`).
- **CI/CD / Sécurité** : Analyse sémantique de sécurité configurée via Anthropic Claude (`security-review.yml`) sur les Pull Requests.
- **Base de données** : Utilisation de PostgreSQL pour tirer parti du type `JSONB` dans le versioning (décision tracée dans `ADR-001`).

## Erreurs Connues et Solutions
*(Vide pour le moment)*

## Prochaines Étapes Techniques
*(À compléter)*
