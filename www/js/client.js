
var apiKey = "45729202";
var sessionId = "2_MX40NTcyOTIwMn5-MTQ4MDYyMTk3NTgxMX5XdEQ1b2hQVnVUendRVGpyNVhqZ25SNHB-UH4";
var token = "T1==cGFydG5lcl9pZD00NTcyOTIwMiZzaWc9OTI3MDJjN2ViZDNmODM0M2VhZDk3NDAxMmZmZjAzZmIyY2NlMTI1ZDpzZXNzaW9uX2lkPTJfTVg0ME5UY3lPVEl3TW41LU1UUTRNRFl5TVRrM05UZ3hNWDVYZEVRMWIyaFFWblZVZW5kUlZHcHlOVmhxWjI1U05IQi1VSDQmY3JlYXRlX3RpbWU9MTQ4MDYyMjAwMyZub25jZT0wLjM4MTQ1NzM0NTg3NzczNzA1JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE0ODMyMTM3NzU=";


var session;
var publisher;
var remoteStreamId = 0;
var connected = false;


function connect() {
    document.getElementById('connectBtn').disabled = true;

    if (!OT.checkSystemRequirements()) {
        alert("Your device does not support WebRTC. :(");
        return;
    }

    session = OT.initSession(apiKey, sessionId);
    session.on({
        connectionCreated: function (event) {
            console.log('connCreated');
            //console.log(event);
        },
        connectionDestroyed: function (event) {
            console.log('connDestroyed');
            //console.log(event);
        },
        sessionDisconnected: function sessionDisconnectHandler(event) {
            console.log('Disconnected from the session.');
            //console.log(event);
            document.getElementById('connectBtn').style.display = 'inline';
            document.getElementById('connectBtn').disabled = false;
            document.getElementById('disconnectBtn').style.display = 'none';
            document.getElementById('publishBtn').style.display = 'none';
            document.getElementById('unpublishBtn').style.display = 'none';

            session.off();
            connected = false;

            if (event.reason === 'networkDisconnected') {
                alert('Your network connection terminated.');
            }
        }
    });


    session.on("streamCreated", function (event) {
        console.log("streamCreated");
        //console.log(event)
        remoteStreamId++;

        var id = "stream" + remoteStreamId;
        var div = document.createElement("div");
        div.id = id;
        document.getElementById("views").insertBefore(div, null);

        session.subscribe(event.stream, id);
    });



    session.connect(token, function (error) {
        if (error) {
            console.log('Unable to connect: ', error.message);
        } else {
            connected = true;
            document.getElementById('connectBtn').style.display = 'none';
            document.getElementById('disconnectBtn').style.display = 'inline';
            document.getElementById('disconnectBtn').disabled = false;
            document.getElementById('publishBtn').style.display = 'inline';
            document.getElementById('publishBtn').disabled = false;
            document.getElementById('unpublishBtn').style.display = 'none';
            console.log('Connected to the session.');
        }
    });
}


function disconnect() {
    document.getElementById('connectBtn').disabled = true;
    session.disconnect();
}

function publish() {
    document.getElementById('publishBtn').disabled = true;

    if (!session.capabilities.publish) {
        alert("You cannot publish an audio-video stream. Connect first.");
        return;
    }

    var myView = document.createElement("div");
    myView.id = "myView";
    prependChild(document.getElementById("views"), myView);


    publisher = OT.initPublisher(myView.id);
    publisher.on({
        streamCreated: function (event) {
            console.log("Publisher started streaming.");
            document.getElementById('publishBtn').style.display = 'none';
            document.getElementById('unpublishBtn').style.display = 'inline';
            document.getElementById('unpublishBtn').disabled = false;
        },
        streamDestroyed: function (event) {
            console.log("Publisher stopped streaming. Reason: "
                    + event.reason);
            document.getElementById('unpublishBtn').style.display = 'none';

            if (connected) {
                document.getElementById('publishBtn').style.display = 'inline';
                document.getElementById('publishBtn').disabled = false;
            }
        }
    });

    session.publish(publisher);
}

function unpublish() {
    document.getElementById('unpublishBtn').disabled = true;

    session.unpublish(publisher);
    publisher.destroy();
    publisher = undefined;
}

function prependChild(parent, newFirstChild) {
    parent.insertBefore(newFirstChild, parent.firstChild);
}
