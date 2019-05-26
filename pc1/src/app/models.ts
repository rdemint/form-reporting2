export interface Practice {
	id?: string;
	providers?: Provider[];
	name: string;
	slug: string;
	entity?: string;
	chart_data: any;
	specialties: Specialty[];
}

export interface Provider {
	id: string;
	first_name: string;
	last_name: string;
	name: string;
	credentials: string;
	specialties: string;
	practices: string[];
}

export interface Specialty {
	id: string;
	name: string;
	slug: string;
	providers?: Provider[];
}


export interface DailySummary {
	id: string;
	date: string;
	last_updated?: string;
	visits: number;
	workdays: number;
	noshows: number;
	practice: string;
	provider: string;
	specialty: string;
	visits_per_workdays: number;
}

export interface User {
	id: string;
	email: string;
	first_name?: string;
	last_name?: string;
	user_type?: string;
}

export interface Entity {
	name: string;
	slug?: string;
	practices?: Practice[];
	providers?: Provider[];
	specialties?: Specialty[];
}


export interface ChartData {
	label: any;
	y: any;
}