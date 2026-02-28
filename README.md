# Portfólio - Igor Viana Tomaz

Portfólio pessoal desenvolvido com React Native + Expo, com suporte para Web e Mobile.

## Tecnologias

- React Native (Expo)
- Expo Router
- TypeScript
- Context API (tema e idioma)
- Expo AV

## Funcionalidades

- Layout responsivo para celular, tablet e desktop
- Suporte a tema claro/escuro
- Suporte a múltiplos idiomas (PT/EN/ES)
- Carrossel de projetos e certificados
- Visualização ampliada de certificados ao tocar na miniatura

## Como rodar no PC

1. Instale as dependências:
```bash
npm install
```
2. Inicie o projeto:
```bash
npm run start
```
3. No terminal do Expo:
- pressione `w` para abrir no navegador
- pressione `a` para abrir Android (emulador)
- pressione `i` para abrir iOS (simulador no macOS)

## Como rodar no celular (Expo Go)

1. Instale o app `Expo Go` no seu celular.
2. No PC, rode:
```bash
npm run start
```
3. Com o app Expo Go:
- Android: escaneie o QR code que aparece no terminal
- iPhone: abra a câmera e escaneie o QR code

## Se não conectar no celular

- Garanta que PC e celular estejam na mesma rede Wi-Fi.
- Se ainda falhar, rode com túnel:
```bash
npx expo start --tunnel
```

## Scripts úteis

- `npm run start` inicia o Expo
- `npm run web` abre versão web
- `npm run android` abre no Android
- `npm run ios` abre no iOS
- `npm run lint` roda lint
