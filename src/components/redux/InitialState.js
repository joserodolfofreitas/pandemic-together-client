import * as Constants from '../common/constants';

export const initialState = {
    player: null,
    room: null,
    roomState: null,
    updatesOnRoomState: 0,
    currentPlayerTurn: "",
    selectedCards: [],
    roomPlayers: [],
    deck: [],
    isLoading: false,
    draggingCard: null,
    dragOverCard: null,
    /*gameMessages: [{messageId: 1, type: "test", value:"test 1 lero"},
                    {messageId: 2, type: "test", value:"test 2 lero lero"},
                    {messageId: 3, type: "test", value:"test 1 bla bla bla"}],*/
    gameMessages: [],
    cards: [

        {
            elementId: "V1",
            type: Constants.CARD_TYPE_VIRUS,
            name: "Virus",
            description: "Infections Killing Virus initial stage",
            action: Constants.ACTION_INCREMENT_VIRUS_TOKEN,
            maxTokensImpact: 1,
            maxCardsImpact: 1,
        },
        {
            elementId: "R1",
            type: Constants.CARD_TYPE_RESOURCE,
            name: "Social Distancing",
            description: "Prevent a virus card to increment tokens",
            action: Constants.ACTION_CONTAIN_VIRUS,
            maxTokensImpact: 0,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "R2",
            type: Constants.CARD_TYPE_RESOURCE,
            name: "Quarantine/Lockdown",
            description: "Prevent 3 virus cards to increment tokens",
            action: Constants.ACTION_CONTAIN_VIRUS,
            maxTokensImpact: 0,
            maxCardsImpact: 3,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "R3",
            type: Constants.CARD_TYPE_RESOURCE,
            name: "Masks and Ventilators",
            description: "destroy one virus token",
            action: Constants.ACTION_DESTROY_VIRUS_TOKEN,
            maxTokensImpact: 1,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "R4",
            type: Constants.CARD_TYPE_RESOURCE,
            name: "Medics",
            description: "destroy three virus token",
            action: Constants.ACTION_DESTROY_VIRUS_TOKEN,
            maxTokensImpact: 3,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "A1",
            type: Constants.CARD_TYPE_ADVANTAGE,
            name: "Educated Population",
            description: "Each round prevents a virus card to increment token",
            action: Constants.ACTION_CONTAIN_VIRUS,
            maxTokensImpact: 0,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "A2",
            type: Constants.CARD_TYPE_ADVANTAGE,
            name: "Public Health System",
            description: "Each round prevents three virus cards to increment token",
            action: Constants.ACTION_CONTAIN_VIRUS,
            maxTokensImpact: 0,
            maxCardsImpact: 3,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "A3",
            type: Constants.CARD_TYPE_ADVANTAGE,
            name: "Advanced Research Labs",
            description: "Each round destroys a virus card token",
            action: Constants.ACTION_DESTROY_VIRUS_TOKEN,
            maxTokensImpact: 1,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "A4",
            type: Constants.CARD_TYPE_ADVANTAGE,
            name: "Safe ports",
            description: "Cant get infected by neighbohrs.",
            action: Constants.ACTION_PREVENT_FROM_NEIGHBOR_INFECTION,
            maxTokensImpact: 0,
            maxCardsImpact: 0,
        },
        {
            elementId: "D1",
            type: Constants.CARD_TYPE_DISADVANTAGE,
            name: "Social Ignorance",
            description: "Each round increments a token to a virus card, ignores containment",
            action: Constants.ACTION_INCREMENT_VIRUS_TOKEN,
            maxTokensImpact: 1,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "D2",
            type: Constants.CARD_TYPE_DISADVANTAGE,
            name: "Slums",
            description: "Each round increments two tokens to a virus card, ignores containment",
            action: Constants.ACTION_INCREMENT_VIRUS_TOKEN,
            maxTokensImpact: 2,
            maxCardsImpact: 1,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "D3",
            type: Constants.CARD_TYPE_DISADVANTAGE,
            name: "Fighiting Narratives",
            description: "Each round increments a token in three virus card, ignores containment",
            action: Constants.ACTION_INCREMENT_VIRUS_TOKEN,
            maxTokensImpact: 1,
            maxCardsImpact: 3,
            impactedElements: ["VIRUS1"],
        },
        {
            elementId: "D4",
            type: Constants.CARD_TYPE_DISADVANTAGE,
            name: "Overloaded hospitals",
            description: "Nullify Advantage Card 2 and Resource Card 4 takes no effect",
            action: Constants.ACTION_PREVENT_CARD_ACTION,
            maxTokensImpact: 0,
            maxCardsImpact: 0,
            impactedElements: ["A2", "R4"],
        },
    ],
}