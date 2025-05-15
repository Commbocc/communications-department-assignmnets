export interface ContentTypeResponse<T = Entry> {
  entries: T[];
}

export interface Entry {
  uid: string;
  _version?: number;
  locale?: string;
  ACL?: Acl;
  _in_progress?: boolean;
  created_at?: string;
  created_by?: string;
  tags?: string[];
  title?: string;
  updated_at?: string;
  updated_by?: string;
  publish_details?: PublishDetails;
}

export interface PublishDetails {
  time: string;
  user: string;
  environment: string;
  locale: string;
}

export interface PublishDetails {
  time: string;
  user: string;
  environment: string;
  locale: string;
}

export interface EntryReference {
  uid: string;
  _content_type_uid: string;
}

export interface RemoteEntryReference {
  api_key: string;
  content_type: string;
  entry_uid: string;
  branch: string;
}

export interface Acl {}

export type StaffFilter = "PRS" | "MRS" | "Manager" | string;

export interface CommunicationsStaff extends Entry {
  departments?: RemoteEntryReference[];
  email?: string;
  filter?: StaffFilter[];
  job_title?: string;
  mobile_phone?: string;
  office_phone?: string;
  out_of_office?: boolean;
  out_of_office_backup?: EntryReference[];
  voip?: string;
}

export interface Department extends Entry {
  url: string;
  title: string;
}
