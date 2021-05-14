import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { GameDetails } from "./game/GameDetails";
import { GameForm } from "./game/GameForm";
import { ReviewForm } from "./game/ReviewForm.js";
import { ReviewProvider } from "./game/ReviewProvider.js";
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile} from "./auth/Profile"
import { ReviewList } from "./game/ReviewList"
import { GamerProvider } from "./game/GamerProvider"

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GamerProvider>
        <GameProvider>
          <ReviewProvider>
            <Route exact path="/">
              <GameList />
            </Route>
            {/* <Route exact path="/games/new">
              <GameForm />
            </Route> */}
    
            <Route
              exact path="/games/new"
              render={(props) => <GameForm {...props} />}
            />
            <Route
              path="/games/edit/:gameId(\d+)"
              render={(props) => <GameForm {...props} />}
            />
            <Route
              path="/games/:gameId(\d+)"render={
                props => <GameDetails {...props} />
              }/>
            <Route 
            exact path="/gamereview/new" render={(props) => <ReviewForm {...props} /> 
            }/>
        
            <Route
              path="/gamereview/:gameId(\d+)"
              render={(props) => {
                return <GameDetails {...props} />;
              }}
            >
            </Route>
            <Route
            path="/reviews/:gameId(\d+)"
            render={(props) => {
              return <ReviewList {...props} />;
            }}>
              </Route>
          </ReviewProvider>
        <ProfileProvider>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </ProfileProvider>
        </GameProvider>
        </GamerProvider>
        
      </main>
    </>
  );
};
