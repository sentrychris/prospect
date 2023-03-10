export interface SoftwareConfiguration
{
  ignored_binaries: Record<string, string>;
  launched_processes: Record<string, string>;
  managed_sas?: Record<string, string>;
  managed_processes?: Record<string, string>;
}

export interface Software
{
  name: string;
  platform: string;
  available_keys: SoftwareConfiguration;
}