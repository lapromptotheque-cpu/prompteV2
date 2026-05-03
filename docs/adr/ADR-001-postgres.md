# ADR 001 : Choix de PostgreSQL

**Statut** : Accepté

## Contexte
La Promptothèque nécessite une base de données robuste pour gérer les prompts, leurs multiples versions, les tags, et les logs d'utilisation (analytics). Nous avions besoin d'un système capable de gérer à la fois des relations classiques (utilisateurs, dossiers) et des données semi-structurées (historique de versions).

## Décision
Nous avons choisi **PostgreSQL**.

## Conséquences
- **Avantages** : 
  - Support natif du type `JSONB` parfait pour stocker l'historique des versions d'un prompt sans schéma rigide.
  - Fiabilité, support étendu par les ORM (comme Drizzle, Prisma).
  - Capacité d'évolution vers de la recherche plein texte (Full-Text Search) native avant d'avoir besoin d'un moteur dédié comme ElasticSearch.
- **Inconvénients** : 
  - Gestion des migrations de base de données nécessaire.
  - Plus complexe à déployer localement qu'une base SQLite (nécessite Docker ou un service distant pour l'environnement de dev).
