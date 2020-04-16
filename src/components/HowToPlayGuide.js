import React from 'react';
import * as Constants from './common/constants';

class HowToPlayGuide extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFullInstructions: false
        };
    }

    onClick_OpenFullInstruction = () => {
        this.setState({showFullInstructions:true});
    }

    onClick_CloseFullInstruction = () => {
        this.setState({showFullInstructions:false});
    }

    render() {
        return (this.state.showFullInstructions) ? this.renderFullInstruction() : this.renderQuickGuide();
    }

    renderQuickGuide() {
            return <div className="how-to-play quick">
                <h1>How to play (Quick Start) </h1>
                <ul>
                    <li>Each player have one turn per round. The current player on turn has their name highlighted.</li>
                    <li>On your turn, use one RESOURCE on your hand to CONTAIN or ELIMINATE a VIRUS card. </li>
                    <li>Simply drag the RESOURCE to any VIRUS on the table to make your play.</li>
                    <li>Each player starts with an advantage and a disadvantage, which have effect at the end of each round.</li>
                    <li>At the end of a round virus cards (that are not contained) get stronger. </li>
                    <li>Virus cards with FOUR tokens, infect their neighbours.</li>
                    <li>Players WIN when all the viruses in the game are destroyed.</li>
                    <li>Players LOSE if the virus gets out of control and there’s no more resources to use OR if any of the players reach a number of FIVE virus cards on their field.</li>
                </ul>
                <button onClick={() => this.onClick_OpenFullInstruction()}>feel like checking the full instructions?</button>
            </div>
    }

    renderFullInstruction() {
        return <div className="how-to-play quick">
                    <div className="full-instructions" >
                    <div className="header">
            Pandemic Together - Full Instructions
            <span onClick={() => this.onClick_CloseFullInstruction()} className="close-button">X</span>
            </div>
            <div className="instructions-content">
                <h2>Introduction</h2>
                “Pandemic together” is a cooperative card game about global solidarity. The game is meant to be played by 3 or 4 players. And each player takes the role of fictitious country and must use all their resources on hand to fight a global threat. Either all players win or all lose, there’s no middle ground.

                <h2>Types of Card</h2>
                There are four card types and each has a specific behaviour.


                <ul className="types-of-cards">
                    <li>
                        <h3>Virus</h3>
                        <div className="description">
                        The virus card represents a place where the virus is spreading. Each virus starts with one token, and at the end of each round, the number of tokens is increased by ONE, making the card harder to eliminate. A Virus card is eliminated when all its tokens are destroyed. Whenever a virus card gets FOUR tokens, it infects two of the player neighbours with a new virus card.
                        </div>
                        <div className="img-example">
                            <img alt="virus example" src="/images/card-V1-example.png"></img>
                        </div>
                    </li>
                    <li>
                        <h3>Resources</h3>
                        <div className="description">
                        A resource card represents actions that countries can take. Each player can apply one resource PER TURN and they come in two ways: They can either be used to CONTAIN one or multiple VIRUS cards or to DESTROY one or multiple VIRUS tokens. After use the resource card is consumed and cannot be played again.
                        </div>
                        <div className="img-example">
                            <img alt="Social Distancing" src="/images/card-R1.png"></img>
                            <img alt="Quarantine / Lockdown" src="/images/card-R2.png"></img>
                            <img alt="Masks and Ventilators" src="/images/card-R3.png"></img>
                            <img alt="Medics" src="/images/card-R4.png"></img>
                        </div>
                    </li>
                    <li>
                        <h3>Advantages</h3>
                        <div className="description">
                        Advantages represent, well, obviously, an advantage of a country the player represents, like for instance “Public Health System”. Advantages are mostly* used like resource cards, to CONTAIN a virus card or DESTROY a virus token, but they are applied at the end of each round and are not consumed after played. They are also applied randomly on its player virus cards.
                        * There’s one exception to this: The “Safe Ports” card, which is not applied each round, but instead its effect is applied to prevent whenever a neighbour gets too infectious (please refer to the Virus card description to understand when it happens).
                        </div>
                        <div className="img-example">
                            <img alt="Educated Population" src="/images/card-A1.png"></img>
                            <img alt="Public Health System" src="/images/card-A2.png"></img>
                            <img alt="Advanced Research Labs" src="/images/card-A3.png"></img>
                            <img alt="Safe Ports" src="/images/card-A4.png"></img>
                        </div>
                    </li>
                    <li>
                        <h3>Disadvantages</h3>

                        <div className="description">
                        Like advantages, disadvantages work the same way. But instead of containing or destroying a virus token, it increments one or multiple tokens on one or multiple virus cards. Disadvantages are particularly dangerous since they ignore containment.

                        * There’s one exception to this: The “Overloaded Hospitals” card, which is not applied each round, but instead its effect prevents the use of medics and nullifies the “Public Health System” advantage card.
                        How the game works
                        </div>

                        <div className="img-example">
                            <img alt="Social Ignorance" src="/images/card-D1.png"></img>
                            <img alt="Slums" src="/images/card-D2.png"></img>
                            <img alt="Fighting Narratives" src="/images/card-D3.png"></img>
                            <img alt="Overloaded Hospitals" src="/images/card-D4.png"></img>
                        </div>
                    </li>
                </ul>

                <h2>Setup</h2>

                At the beginning of the game, each player is given an advantage and disadvantage card that are displayed on the table for all the players to see.
                The main deck is shuffled with 12 resources and 4 virus cards per player.
                Each player then draws 3 cards from the deck. The order of playing is set by the order of joining the room, that means the first player to log in the room is the first one to play.

                <h2>Table Layout</h2>

                When  the game starts, the main deck is placed on the center of the screen, and you'll be able to see all your friends advantages, disadvantages and virus cards. Each one at a side of the screen. async.
                The bottom of the screen is reserved for your own cards. You'll see your advantage and disadvantage on the left, your virus field on the center, and your hand on the right.
                Following you can see an example of table layout.
                <div style={{height:400}} className="img-example">
                    <img alt="Table Layout" className="table-layout" src="/images/pt-table-layout.jpg"></img>
                </div>


                <h2>Drawing cards</h2>
                Drawing cards are done automatically. And player draws cards from the deck in two situations: At the beginning of the game, when the player draws three cards, and each turn before playing when the player draws one card. Everytime a player draws, the card can be either a resource or virus. Virus cards are immediately displayed on the table, while Resources go to the players hand. The resources on the hand are not visible to the other players.

                <h2>Game Round</h2>
                The game is divided in several rounds (with a max of 13 rounds) and on each round each player gets one turn, where the player can play ONE resource card.
                Each player can play a resource into one or multiple virus, depending on the resource used, and the player can apply a resource card on their own field or on any virus on the table.

                At the end of the round it’s the virus turn, each virus card that is not contained gets stronger by getting one more token.
                After that Advantages and Disadvantages play their effects and a new round begins.

                <h2>Victory Condition</h2>
                The victory condition is simple, players win when all the virus cards in the game are eliminated, that does not include only the cards that were initially shuffled in the deck, but also the virus cards created by neighbour infections.

                <h2>Defeat Condition</h2>
                There are two conditions for defeat.
                The deck is empty and the remaining resources are not enough to eliminate the viruses on the table.
                A player gets FIVE virus cards displayed on the table. And remeber: if one player loses all player lose.

                <h2>Playing Tips</h2>
                <ul>
                <li>Always remember this is a collaboration game.</li>
                <li>Act fast, or the virus will get out of control.</li>
                <li>But think carefully to not waste resources, like spending medics to destroy one virus token, when it can destroy three.</li>
                <li>Watchout for every advantage and disadvantage card on the table. They can easily tip the balances of the game.</li>
                <li>Do not forget that disadvantages are very dangerous and ignore virus cards’ containment.</li>
                </ul>
                </div>
            </div>
        </div>
    }


}

export default HowToPlayGuide;

