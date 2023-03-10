import re, os
import platform
import subprocess
import hashlib
import psutil

if platform.system() == "Windows":
  import winreg


def windows_software(hive, flag):
    aReg = winreg.ConnectRegistry(None, hive)
    aKey = winreg.OpenKey(aReg, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
                          0, winreg.KEY_READ | flag)

    count_subkey = winreg.QueryInfoKey(aKey)[0]

    software_list = []

    for i in range(count_subkey):
        software = {}
        try:
            asubkey_name = winreg.EnumKey(aKey, i)
            asubkey = winreg.OpenKey(aKey, asubkey_name)
            software['name'] = winreg.QueryValueEx(asubkey, "DisplayName")[0]

            try:
                software['version'] = winreg.QueryValueEx(asubkey, "DisplayVersion")[0]
            except EnvironmentError:
                software['version'] = 'undefined'
            try:
                software['publisher'] = winreg.QueryValueEx(asubkey, "Publisher")[0]
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
        

def hash_id(str):
    return hashlib.sha256(str.encode('utf-8'))


def get_Windows_name():
    o = subprocess.Popen('systeminfo', stdout=subprocess.PIPE).communicate()[0]
    try: o = str(o, "latin-1")  # Python 3+
    except: pass  
    return re.search("OS Name:\s*(.*)", o).group(1).strip()


def distro():
    if platform.system() == "Windows":
        return get_Windows_name()
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


def cpu():
    return dict({
        'usage': round(psutil.cpu_percent(1), 2),
        'freq': round(psutil.cpu_freq().current, 2)
    })

def memory():
    mem = psutil.virtual_memory()

    return dict({
        'total': round(mem.total / (1024.0 ** 3), 2),
        'used': round(mem.used / (1024.0 ** 3), 2),
        'free': round(mem.free / (1024.0 ** 3), 2),
        'percent': mem.percent
    })


def disk():
    disk = psutil.disk_usage('/')

    return dict({
        'total': round(disk.total / (1024.0 ** 3), 2),
        'used': round(disk.used / (1024.0 ** 3), 2),
        'free': round(disk.free / (1024.0 ** 3), 2),
        'percent': disk.percent
    })


def hwid():
    if platform.system() == "Linux":
        id = os.popen("cat /etc/machine-id").read().split('\n')[0].strip()
    elif platform.system() == "Windows":
        id = str(subprocess.check_output('wmic csproduct get uuid'), 'utf-8').split('\n')[1].strip()
        
    return id


profile = {
    'hwid': hash_id(hwid()).hexdigest(),
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
        } ,
        'ram': memory(),
        'disk': disk()
    }    
}


print(profile)
