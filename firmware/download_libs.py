Import("env")
import os
import shutil
from platformio.package.meta import PackageSpec
from platformio.project.config import ProjectConfig

def download_libraries():
    # List of required libraries
    libraries = [
        "h2zero/NimBLE-Arduino @ ^1.4.1",
        "bblanchon/ArduinoJson @ ^6.21.3",
        {"name": "AsyncTCP", "version": "master", "repository": "https://github.com/me-no-dev/AsyncTCP.git"},
        {"name": "ESPAsyncWebServer", "version": "master", "repository": "https://github.com/me-no-dev/ESPAsyncWebServer.git"}
    ]

    lib_dir = os.path.join(env.subst("$PROJECT_DIR"), "lib")
    if not os.path.exists(lib_dir):
        os.makedirs(lib_dir)

    for lib in libraries:
        if isinstance(lib, str):
            env.Execute("pio pkg install --global -l \"%s\"" % lib)
        else:
            repo_path = os.path.join(lib_dir, lib["name"])
            if not os.path.exists(repo_path):
                env.Execute("git clone %s %s" % (lib["repository"], repo_path))
                with open(os.path.join(repo_path, ".gitignore"), "w") as f:
                    f.write("*\n!.gitignore\n")

env.AddPreAction("buildprog", download_libraries)
