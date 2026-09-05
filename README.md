# 🧪 Stratégie de Test - Todo App (React / Redux / Vite)

Ce projet intègre un pipeline de tests complet couvrant la pyramide de tests à trois niveaux : **Unitaires**, **Intégration** et **End-to-End (E2E)**.

---

## 📐 Architecture des Tests

```text
├── src/
│   ├── redux/
│   │   └── taskSlice.test.js      # 🧪 Tests Unitaires (Actions & Reducers Redux Toolkit)
│   ├── tests/
│   │   └── integration/
│   │       └── AppIntegration.test.jsx # 🧩 Tests d'Intégration (Composants React + Store)
│   └── setupTests.js              # ⚙️ Mocks globaux (window.matchMedia, jest-dom)
├── e2e/
│   └── todo.spec.js               # 🌐 Tests End-to-End (Navigateur Chromium via Playwright)
└── run-tests.js                   # 🚀 Script CLI pour exécuter les suites de tests

🛠️ Technologies UtiliséesType de TestOutils PrincipauxDescription / RôleUnitairesVitestValidation isolée de la logique Redux Toolkit (taskSlice).IntégrationVitest + React Testing Library + jsdomSimulation des interactions composants React avec le Redux Store dans un DOM virtuel.End-to-End (E2E)PlaywrightScénario réel dans un navigateur (Chromium) connecté au serveur local Vite (http://localhost:5173).🚀 Exécution des TestsUn script CLI sur mesure (run-tests.js) permet d'exécuter chaque suite indépendamment ou de lancer le pipeline global.1. Lancer l'ensemble de la suite (Pipeline Complet)Exécute séquentiellement les tests unitaires, d'intégration et E2E :PowerShellnode run-tests.js all
# ou simplement
node run-tests.js
2. Lancer les Tests Unitaires uniquementPowerShellnode run-tests.js unit
3. Lancer les Tests d'Intégration uniquementPowerShellnode run-tests.js integration
4. Lancer les Tests E2E (Playwright)PowerShellnode run-tests.js e2e
⚙️ Détails des Configurations ParticulièresMocks de l'environnement DOM (src/setupTests.js) :Un mock global de window.matchMedia est configuré pour éviter les erreurs TypeError: window.matchMedia is not a function générées par les composants d'interface (comme la gestion du thème clair/sombre).Séparation Vitest / Playwright (playwright.config.js) :Playwright est configuré avec testDir: './e2e' et ignore le dossier src/ afin d'éviter tout conflit d'analyse syntaxique avec le CSS Tailwind v4 ou les dépendances de modules Vitest.Serveur de développement automatique :Playwright démarre et gère automatiquement le serveur Vite (npm run dev) si celui-ci n'est pas déjà actif lors du lancement des tests E2E.📝 Commandes npm équivalentesSi vous préférez utiliser npm scripts :Bashnpm test                 # Lance Vitest en mode Watch
npx vitest run           # Lance tous les tests Vitest une seule fois
npx playwright test e2e  # Lance la suite Playwright E2E

<ElicitationsGroup message="Souhaitez-vous aller plus loin sur la gestion de vos tests ?">
  <Elicitation label="Ajouter un badge de statut de test au README" query="Peux-tu m'aider à ajouter des badges GitHub Actions de statut de test dans le README.md ?"/>
  <Elicitation label="Configurer un workflow GitHub Actions (CI/CD)" query="Comment configurer un fichier .github/workflows/tests.yml pour exécuter node run-tests.js all à chaque commit ?"/>
</ElicitationsGroup>