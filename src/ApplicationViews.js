import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { GameDetails} from "./game/GameDetails"
import { GameForm } from "./game/GameForm"

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <Route exact path="/">
            <GameList />
          </Route>
          <Route exact path="/games/new">
            <GameForm />
          </Route>
          <Route path="/games/:gameId(\d+)" render={(props) => { return <GameDetails {...props} />
          }} />
        </GameProvider>
      </main>
    </>
  );
};
