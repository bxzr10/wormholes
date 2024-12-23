import { PlanetTypes } from "../template";
import {  PlayerIndex_t, WormholeIndex_t } from "./aliasutils";
import { HexLocation_t } from "./hexnodeutils";

export const k_fuelPerRound = 3;

export interface Player_t {
    playerIndex: PlayerIndex_t,
    name: string,
    score: number,
    fuelLeft: number,
    hasPickedUp: boolean,
    wormholes: Wormhole[]
    hexLocation: HexLocation_t | null;
    passengers: PlanetTypes[];
}

export interface Wormhole {
    wormholeIndex: WormholeIndex_t,
    playerIndex: PlayerIndex_t,
    locationA: HexLocation_t | null,
    locationB: HexLocation_t | null,
    active: boolean,
}

export function GenerateDefaultWormholes( playerIndex: PlayerIndex_t, initialLocation: HexLocation_t ): Wormhole[]
{
    return  Array.from(Array(5).keys()).map( ( wormholeIndex ) => {
       return {
            wormholeIndex: wormholeIndex as WormholeIndex_t,
            playerIndex,
            locationA: wormholeIndex === 0 ? initialLocation : null ,
            locationB : null,
            active: false,
       }
    })
}

export const initialPassengersPerPlayer: { [ index: PlayerIndex_t] : number } = 
{
    [ 0 as PlayerIndex_t ]: 1,
    [ 1 as PlayerIndex_t ]: 2,
    [ 2 as PlayerIndex_t ]: 2,
    [ 3 as PlayerIndex_t ]: 3,
    [ 4 as PlayerIndex_t ]: 3,
}