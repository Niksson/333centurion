# Centurion - The speedcubing drinking game

## Alpha status

This app is considered alpha - basic functions are implemented, but there is
still a lot to do for it to become a complete app.

The basic stuff is here:

- You can time your solve
- You can mark your rounds as complete
- The app calculates best, worst, mean and averages of your rounds

Some fancy stuff:

- The game state is saved if you reload the page or close the tab.
  You can continue from the same place you have left
- You can customize your game: select the amount of rounds, amount
  of time alotted for each round, amount of alcohol to drink and
  the game mode (in beer mode you drink each attempt and in liquor
  mode you drikn every 10 attempts)

There are still bugs to iron out and tests to be implemented

The UI is right now made only for "PC screens" (1920x1080 and higher) and
is not adapted to smaller screens.

## Rule inspiration

The logic of the app was inspired by [Centurion regulations](https://docs.google.com/document/d/1E0HR36tRbCK6hXiwavSnsNiJxXqOYpcEqVpdWdf8cXU/edit?usp=sharing)

## Requirements

- Node >=22.9.0
- A code editor

## Development

- Clone the repo and cd into the cloned directory:

```sh
git clone https://github.com/Niksson/333centurion
cd 333centurion/
```

- Install the dependencies:

```sh
npm install
```

- Run the development server:

```sh
npm run dev
```
