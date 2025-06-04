


export interface DelegateNote {
  text: string
  createdAt: string
  id: number;
  entity_table: string;
  entity_id: number;
  note: string;
  contact_id: number;
  subject: string;
  privacy: string;
  note_date: string;
  created_date: string;
  modified_date: string;
}





export interface Activitysaif {
  activity_id: number;
  subject: string;
  activity_date_time: string;
  status_id: number;
  activity_type_id: number;
  activity_type_label: string;
  status_label: string;
}

export interface Delegate {
 
  contactId: string
  contactName: string
  contactType: 'individual' | 'organization'
  startDate: string
  endDate?: string
  isActive: boolean
  membershipType: 'delegate' | 'member_state'
  memberState?: string // Added member state for delegates
  isNewsletterSubscribed: boolean // Added newsletter subscription status
  role?: string // Role within the organization
  emails: string[] // Multiple email addresses

  language: 'English' | 'French' // Preferred communication language
  id: number;
  prefix?: string;
  prefix_id?: number;
  first_name: string;
  last_name: string;
  fullname: string;

  job_title?: string;
  gender?: string;
  gender_id?: number;

  start_date?: string;
  end_date?: string;

  email?: string;
  phones: string[] // Multiple phone numbers
  mails?: string;
  notes?: DelegateNote[] // Changed to array of timestamped notes

  preferred_language?: string;
  label_fr_FR?: string;
  label_en_US?: string;

  type?: number;
  mid?: number;
  external_identifier?: string;

  country_id?: number;
  country?: string;
  country_fr?: string;
  country_en?: string;

  order?: number | null;
  employer?: string | null;

  address?: Address;
}
export interface Address {
  id: number;
  contact_id: number;
  location_type_id?: number;
  is_primary?: number;
  is_billing?: number;
  street_address?: string;
  street_number?: string | null;
  street_number_suffix?: string | null;
  street_number_predirectional?: string | null;
  street_name?: string | null;
  street_type?: string | null;
  street_number_postdirectional?: string | null;
  street_unit?: string | null;
  supplemental_address_1?: string | null;
  supplemental_address_2?: string | null;
  supplemental_address_3?: string | null;
  city?: string;
  county_id?: number | null;
  state_province_id?: number | null;
  postal_code?: string;
  postal_code_suffix?: string | null;
  usps_adc?: string | null;
  country_id?: number;
  geo_code_1?: number | null;
  geo_code_2?: number | null;
  manual_geo_code?: number;
  timezone?: string | null;
  name?: string | null;
  master_id?: number | null;
}