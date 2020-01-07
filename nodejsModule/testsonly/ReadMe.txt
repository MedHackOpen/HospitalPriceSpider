WHY THIS FOLDER AND SETUP
* Processing a folder with many csv files is hectic especially when files have
huge streams of data, some data is lost to memory, and some files are read
simultaneously before the first one is done with.
* To leverage nodes event system with ease (`https://nodejs.org/api/events.html`)
I have opted to use electron because of it's well defined events api built on top
of nodes event (`https://electronjs.org/docs/api/ipc-main`), and react js because
it's easier to update it's (React js) states via events and also call or send data
to electron (back-end) via such events. Thus allowing simultaneous csv file processing.

