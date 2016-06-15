all:
	meteor

# Do not run if meteor is already installed!
install:
	sh meteor.sh


# Only run this if something is wrong!
uninstall:
	sudo rm /usr/local/bin/meteor
	rm -rf ~/.meteor