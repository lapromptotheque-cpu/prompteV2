# Module : Playground

## Responsabilité
Fournir un environnement de test interactif permettant aux utilisateurs d'exécuter, de comparer différents prompts et de tester divers modèles d'IA en temps réel.

## Entrées / Sorties
- **Entrées** : Prompts sélectionnés, variables injectées par l'utilisateur, choix du LLM (modèle).
- **Sorties** : Résultats générés par l'IA, métriques d'exécution (tokens consommés, temps de réponse).

## Dépendances
Ce module interagit avec :
- `prompts` (pour charger un prompt existant depuis la bibliothèque).
- `analytics` (pour logger l'utilisation des modèles et les coûts associés).

## Modèle de données clé (Schéma)
```sql
TABLE sessions (
    id UUID PRIMARY KEY,
    input_prompt TEXT,
    output_result TEXT,
    timestamp TIMESTAMP
);
```
