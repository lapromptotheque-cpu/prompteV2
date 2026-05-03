# Module : Analytics

## Responsabilité
Collecter, agréger et afficher les statistiques d'utilisation des prompts, les coûts générés par la consommation de tokens, et les logs système.

## Entrées / Sorties
- **Entrées** : Événements générés par le `playground` et les `workflows`.
- **Sorties** : Agrégations de données, calculs de coûts, data pour les tableaux de bord (dashboards).

## Dépendances
Ce module est appelé par les autres modules (`playground`, `workflows`, `prompts`) pour l'enregistrement des logs. Le processus d'enregistrement doit idéalement être asynchrone pour ne pas impacter les performances des autres modules.

## Modèle de données clé (Schéma)
```sql
TABLE logs (
    id UUID PRIMARY KEY,
    user_id UUID,
    prompt_id UUID,
    usage_metrics JSONB
);
```
