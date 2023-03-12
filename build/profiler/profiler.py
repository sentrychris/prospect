import hashlib
import os
import platform
import re
import requests
import subprocess

if platform.system() == "Windows":
  import winreg


def windows_software(hive, flag):
    reg_key = winreg.OpenKey(winreg.ConnectRegistry(None, hive), r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", 0, winreg.KEY_READ | flag)
    count_subkey = winreg.QueryInfoKey(reg_key)[0]

    software_list = []
    for i in range(count_subkey):
        software = {}
        try:
            sub_key = winreg.OpenKey(reg_key, winreg.EnumKey(reg_key, i))
            software['name'] = winreg.QueryValueEx(sub_key, "DisplayName")[0]

            try:
                software['version'] = winreg.QueryValueEx(sub_key, "DisplayVersion")[0]
            except EnvironmentError:
                software['version'] = 'undefined'
            try:
                software['publisher'] = winreg.QueryValueEx(sub_key, "Publisher")[0]
            except EnvironmentError:
                software['publisher'] = 'undefined'
            software_list.append(software)
        except EnvironmentError:
            continue

    return software_list


def linux_software():
    software_list = []

    packages = subprocess.check_output(['dpkg', '-l'])
    for package in str(packages, 'utf-8').split('\n'):
        software = {}

        package_info = list(filter(None, package.split("  ")))

        if (len(package_info) > 3):
          software['name'] = package_info[1].strip()
          software['version'] = package_info[2].strip()
          software['publisher'] = package_info[3].strip()
      
          software_list.append(software)
    
    return software_list
        

def get_windows_name():
    o = subprocess.Popen('systeminfo', stdout=subprocess.PIPE).communicate()[0]
    try: o = str(o, "latin-1")  # Python 3+
    except: pass  
    return re.search("OS Name:\s*(.*)", o).group(1).strip()


def distro():
    if platform.system() == "Windows":
        return get_windows_name()
    elif platform.system() == "Linux":
        return os.popen('cat /etc/*-release | awk NR==1 | cut -c 12-').read().replace('"', '').rstrip()


def processor():
    if platform.system() == "Windows":
        return platform.processor()
    elif platform.system() == "Darwin":
        os.environ['PATH'] = os.environ['PATH'] + os.pathsep + '/usr/sbin'
        command ="sysctl -n machdep.cpu.brand_string"
        return subprocess.check_output(command).strip()
    elif platform.system() == "Linux":
        command = "cat /proc/cpuinfo"
        all_info = subprocess.check_output(command, shell=True).decode().strip()
        for line in all_info.split("\n"):
            if "model name" in line:
                return re.sub( ".*model name.*:", "", line,1)
    return ""


def hwid():
    if platform.system() == "Linux":
        id = os.popen("cat /etc/machine-id").read().split('\n')[0].strip()
    elif platform.system() == "Windows":
        id = str(subprocess.check_output('wmic csproduct get uuid'), 'utf-8').split('\n')[1].strip()
        
    return hashlib.sha256(id.encode('utf-8'))


if platform.system() == "Windows":
    installed_software = windows_software(
        winreg.HKEY_LOCAL_MACHINE,
        winreg.KEY_WOW64_32KEY) + windows_software(
            winreg.HKEY_LOCAL_MACHINE,
            winreg.KEY_WOW64_64KEY
        ) + windows_software(
            winreg.HKEY_CURRENT_USER, 0
        )
elif platform.system() == "Linux":
    installed_software = linux_software()


profile = {
    'hwid': hwid().hexdigest(),
    'hostname': platform.node(),
    'os': {
        'platform': platform.system(),
        'distribution': distro().strip(),
        'arch': platform.architecture()[0],
        'kernel': platform.release(),
    },
    'software': {
        'programs': installed_software[:3],
        'num_installed': len(installed_software)
    },
    'hardware': {
        'cpu': {
            'name': processor().strip(),
            'cores': os.cpu_count(),
        }
    }    
}

requests.post('https://prospect-pi.ddns.net/api/devices/profiles', headers={'Authorization': 'Bearer eDBnenpBOGMmQlF3d2hTSG5FRVVZbVlt'}, json=profile)
