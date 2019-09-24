export interface Practice {
	id: string;
	providers?: Provider[];
	name: string;
	slug: string;
	entity?: string;
	specialties: Specialty[];
	org_type: string;
}

export interface Provider {
	id: string;
	first_name: string;
	last_name: string;
	name?: string;
	credentials: string;
	specialties: string[];
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

export interface SummaryOverviewObject {
	visits: number;
	workdays: number;
	noshows: number;
	visits_per_workdays: number;
}

export interface SummaryOverview {
	overview_type: string;
	date_filter: number;
	date_filter_ref: string;
	summary_count: number;
	visits: object;
	visits_per_workdays: object;
	workdays: object;
	noshows: object;
}

export interface MonthlySummary {
	date?: string;
	last_updated?: string;
	visits: number;
	workdays: number;
	noshows: number;
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
	id: number;
	name: string;
	slug?: string;
	practices?: Practice[];
	providers?: Provider[];
	specialties?: Specialty[];
	org_type: string;
}


export interface ChartData {
	label: any;
	y: any;
}

export interface Org {
	name: string;
}

export interface Collection {
  id?: number;
  submitted_by?: string;
  practice: number;
  entity?: number;
  date: string;
  submitted_on?: string;
  last_updated?: string;
  amount: number;
}
