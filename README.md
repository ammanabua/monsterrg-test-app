
# MonsterRG Test App

A modern Angular + Firebase application for flight management, featuring authentication, Firestore CRUD, and a beautiful, responsive UI.

## Features
- Elegant landing page with site introduction and hero image
- Stylish login and sign-up pages with validation
- Google sign-in via Firebase Auth
- Route protection for authenticated users
- Store and retrieve flight details in Firestore
- Success and failure modals for flight storage
- Responsive design for mobile and desktop
- Integration with external API for flight info challenge
- Modern UI with Material icons, gradients, and animated feedback

## Folder Structure
```
monsterrg-test-app/
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
├── public/
│   └── favicon.ico
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.component.ts/html/css
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── models/
│       │   └── flight-info-payload.model.ts
│       ├── pages/
│       │   ├── landing-page/
│       │   │   └── landing-page.component.*
│       │   ├── flights/
│       │   │   └── flights.component.*
│       │   ├── sign-in-page/
│       │   │   └── sign-in.component.*
│       │   ├── sign-up-page/
│       │   │   └── sign-up-page.component.*
│       ├── shared/
│       │   ├── flight-success-dialog/
│       │   │   └── flight-success-dialog.component.*
│       │   ├── flight-failed-dialog/
│       │   │   └── flight-failed-dialog.component.*
│       ├── auth.guard.ts
│       └── environments/
│           └── environment.ts
│   └── assets/
│       └── hero.jpg
```


## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- Firebase CLI (`npm install -g firebase-tools`)

### Installation
1. Clone the repository:
  ```sh
  git clone <repo-url>
  cd monsterrg-test-app
  ```
2. Install dependencies:
  ```sh
  npm install
  ```

### Development
To run the app locally:
```sh
ng serve
```
Visit `http://localhost:4200` in your browser.

### Build
To build the app for production:
```sh
ng build
```

### Deploy to Firebase
1. Build the app:
  ```sh
  ng build
  ```
2. Deploy:
  ```sh
  firebase deploy
  ```


## API Integration
- The app sends flight details to an external API:
  `https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge`
- Required headers:
  - `token`: (see environment.ts)
  - `candidate`: (see environment.ts)
- Payload interface:
  ```typescript
  export interface FlightInfoPayload {
    airline: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    numOfGuests: number;
    comments?: string;
  }
  ```


## Authentication & Route Protection
- Uses Firebase Auth for email/password and Google sign-in
- Flights route is protected by `auth.guard.ts` and redirects to sign-in if not authenticated


## UI/UX
- Responsive layout for mobile and desktop
- Material icons and gradients for modern look
- Success and error dialogs for feedback
- Animated buttons and transitions


## Extending & Maintaining
- Add new models to `src/app/models/`
- Add new pages to `src/app/pages/`
- Shared components go in `src/app/shared/`
- Update environment variables in `src/app/environments/environment.ts`
- Add images to `src/assets/` for use in components

## License
MIT
