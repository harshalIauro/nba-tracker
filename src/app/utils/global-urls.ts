/** This file is use to maintain all the urls as well as the environments */

import { ENVIRONMENT } from '../../environments/environment';
const baseUrl = ENVIRONMENT.baseUrl;
const logoBaseUrl = ENVIRONMENT.logoUrl;

export class GlobalUrl {
	public static readonly getAllTeams = `${baseUrl}/teams`;
	public static readonly getGameDetails = `${baseUrl}/games?{params}`;
	public static readonly logoUrl = logoBaseUrl;
}
