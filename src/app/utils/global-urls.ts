/** This file is use to maintain all the urls as well as the environments */

import { ENVIRONMENT } from '../../environments/environment';
const baseUrl: string = ENVIRONMENT.baseUrl;
const logoBaseUrl: string = ENVIRONMENT.logoUrl;

export class GlobalUrl {
	public static readonly getAllTeams: string = `${baseUrl}/teams`;
	public static readonly getGameDetails: string = `${baseUrl}/games?{params}`;
	public static readonly logoUrl: string = logoBaseUrl;
}
