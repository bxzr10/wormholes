import { Player_t } from './Player';

export function PlayerLayout ( props: { player: Player_t }) {
    

    return (
        <div>
            <h2>{props.player.name}</h2>
            <p>Score: {props.player.score}</p>
        </div>
    );
};