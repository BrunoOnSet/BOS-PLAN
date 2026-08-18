# BOS LIGHT DB

Base commune des projecteurs BOS.

- `lights.json` est la source commune pour BOS Light et BOS Plan Feu.
- `capabilities.planFeu` indique si le projecteur est disponible dans Plan Feu.
- `capabilities.lightCalculator` indique si une photométrie exploitable est disponible pour les calculs de BOS Light.
- `calculator.accessories` contient les mesures par modificateur : nu, bol/réflecteur, softbox, Fresnel, etc.
- Les valeurs `quality: estimated` restent explicitement distinguées des mesures constructeur.
- Ne jamais inventer une photométrie absente : un projecteur peut être présent dans Plan Feu sans être affiché dans le calculateur Light.

Dépôt conseillé : `BrunoSetTools/BOS-LIGHT-DB`, branche `main`.
URL attendue par les apps : `https://raw.githubusercontent.com/BrunoSetTools/BOS-LIGHT-DB/main/lights.json`.
