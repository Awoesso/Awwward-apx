## Awwward-apx

Projet React + Vite contenu dans le sous-dossier `vite-project`.

## Démarrage (développement)

Ouvrir un terminal dans le dossier `vite-project` puis :

```bash
cd vite-project
npm install
npm run dev -- --host 0.0.0.0
```

L'application sera disponible localement sur `http://localhost:5173/` (ou un autre port si 5173 est occupé).

## Build (production)

```bash
cd vite-project
npm run build
```

## Conventions

- Le point d'entrée est `vite-project/src/main.jsx`.
- Les fichiers CSS/Tailwind sont dans `vite-project/src/index.css`.
- `vite.config.js` et `tailwind.config.js` sont configurés pour travailler à l’intérieur de `vite-project`.

## Remarques

- Eviter d’installer des dépendances à la racine du repo ; tout doit rester dans `vite-project`.
