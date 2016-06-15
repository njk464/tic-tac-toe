all:
	meteor

admin_all:
	sudo meteor

# Do not run if meteor is already installed!
install:
	sudo sh meteor.sh


# Only run this if something is wrong!
uninstall:
	sudo rm /usr/local/bin/meteor
	rm -rf ~/.meteor