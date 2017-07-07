## Node installation on Linux (inc Amazon linux)
Personal note for installing node on linux
- check if git is installed
```sh
git  --version
```
- if git is not installed
```sh
sudo yum install git
```
- install gcc and open ssl
```sh
sudo yum install gcc-c++ make
sudo yum install openssl-deve
```
- clone the git repo into a directory called node (which you can remove later):
```sh
git clone https://github.com/nodejs/node.git
```
- if you want to install specific version, do the following.
- replace x to be your version number
```sh
cd node
git checkout v6.x.x
```
- build node
```sh
./configure
make
sudo make install
```
-once the installation is done, check the node version and npm version
```sh
node --version
npm --version
```



