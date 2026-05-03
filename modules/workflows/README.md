# Module : Workflows

## Responsabilité
Gérer les automatisations, les chaînes de prompts (prompt chaining) et l'exposition via API/Webhooks pour l'intégration avec des outils tiers.

## Entrées / Sorties
- **Entrées** : Triggers (événements externes), requêtes HTTP sur l'API, séquences de prompts paramétrées.
- **Sorties** : Exécution asynchrone ou synchrone de séquences, retours JSON d'API.

## Dépendances
Ce module interagit avec :
- `prompts` (pour utiliser les templates stockés lors des étapes du workflow).
- Services externes (via les intégrations API).

## Modèle de données clé (Schéma)
```sql
TABLE workflows (
    id UUID PRIMARY KEY,
    steps JSONB[],
    triggers JSONB
);
```
