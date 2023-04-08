export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

export interface meta {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
}

export interface TeamList {
    data: Team[];
    meta: meta;
}

export interface TeamDetails {
    id: number;
    abbreviation: string;
    conference: string;
    name: string;
    results: string[];
    avgPtsScore: number;
    avgPtsConceded: number;
    scores: Score[];
}

export interface Score {
    selectedTeam: string;
    opponentTeam: string;
    selectedTeamScore: number;
    opponentTeamScore: number;
}

export interface GameDetails {
    data: Game[];
    meta: meta;
}

export interface Game {
    id: number;
    date: string;
    home_team: Team;
    home_team_score: number;
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: Team;
    visitor_team_score: number;
}