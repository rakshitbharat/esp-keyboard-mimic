Import("env")

def prebuild_deps(source, target, env):
    import sys
    import os
    import subprocess
    from platformio import util
    
    print("Installing required libraries...")
    
    # List of libraries to install
    libraries = [
        "h2zero/NimBLE-Arduino@^1.4.1",
        "bblanchon/ArduinoJson@^6.21.3"
    ]
    
    def handle_error(cmd, returncode, stdout, stderr):
        print(f"Error executing {cmd}")
        print(f"Return code: {returncode}")
        if stdout: print(f"Output: {stdout}")
        if stderr: print(f"Error: {stderr}")
        return False
    
    # List of git repositories to clone
    git_repos = [
        {
            "name": "AsyncTCP",
            "url": "https://github.com/me-no-dev/AsyncTCP.git",
            "branch": "master"
        },
        {
            "name": "ESPAsyncWebServer",
            "url": "https://github.com/me-no-dev/ESPAsyncWebServer.git",
            "branch": "master"
        }
    ]
    
    # Install PlatformIO libraries
    for lib in libraries:
        print(f"Installing {lib}...")
        os.system(f"pio pkg install --library \"{lib}\"")
    
    # Clone git repositories
    lib_dir = os.path.join(env.get("PROJECT_DIR"), "lib")
    if not os.path.exists(lib_dir):
        os.makedirs(lib_dir)
        
    for repo in git_repos:
        repo_path = os.path.join(lib_dir, repo["name"])
        if not os.path.exists(repo_path):
            print(f"Cloning {repo['name']}...")
            subprocess.run(["git", "clone", "-b", repo["branch"], repo["url"], repo_path])

# Register the prebuild script
env.AddPreAction("buildprog", prebuild_deps)
env.AddPreAction("upload", prebuild_deps)
