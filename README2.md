
## To configure and generate makefiles. (build/compile_command.txt is also generated)
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DCMAKE_BUILD_TYPE=Debug

### build
cmake --build build


### In vscode , install the CMAKE plugin
