export interface OperatingSystem
{
  platform: string;
  distribution: string;
  arch: string;
  kernel: string;
}

export interface Program
{
  name: string;
  version: string;
  publisher: string;
}

export interface Software
{
  programs: Array<Program>
  num_installed: number;
}

export interface Hardware
{
  cpu: {
    name: string;
    cores: number;
  };
}

export interface Device {
    hwid: string;
    hostname: string;
    os: OperatingSystem;
    software: Software;
    hardware: Hardware;
    last_seen: string;
}