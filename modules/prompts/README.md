# Module : Prompts

## Responsabilité
Ce module gère le cœur de la plateforme : le stockage, la recherche, le versioning et la gestion des favoris pour la bibliothèque de prompts.

## Entrées / Sorties
- **Entrées** : Requêtes de recherche des utilisateurs (user queries), créations de nouveaux prompts.
- **Sorties** : Liste de prompts filtrés, détails d'un prompt spécifique, versions historiques.

## Dépendances
Ce module interagit potentiellement avec :
- `content_storage` (stockage des textes).
- `users` (liaison des prompts aux auteurs/favoris).

## Modèle de données clé (Schéma)
```sql
TABLE prompts (
    id UUID PRIMARY KEY,
    text TEXT NOT NULL,
    tags VARCHAR[],
    versions JSONB[]
);
```

## Exemple d'utilisation (Test)
```javascript
// Test: Récupérer un prompt par ID
const prompt = await getPromptById('1234');
expect(prompt.text).toBeDefined();
```
