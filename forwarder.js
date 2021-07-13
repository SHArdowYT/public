//SHArdow

async function forwarder()
{

    var recent = {}


    if ((localStorage.getItem("recent")) == null)
    {
        defaultRecent = {"Recent": []};
        localStorage.setItem("recent", (JSON.stringify(defaultRecent)));
        recent = (JSON.parse(localStorage.getItem("recent")));
    }
    else if ((localStorage.getItem("recent")) != null)
    {
        recent = (JSON.parse(localStorage.getItem("recent")));

        var repeats = 0;
        while ((repeats < ((recent["Recent"]).length)) && (repeats < 4))
        {
            document.getElementById("tableRow" + (String(repeats))).innerHTML = (recent["Recent"][repeats]);
            repeats = repeats + 1;
        }

    }





    document.getElementById("tableRow0").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                document.getElementById("tokenInput").value = (recent["Recent"][0]);
            }

        )

    );

    document.getElementById("tableRow1").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                document.getElementById("tokenInput").value = (recent["Recent"][1]);
            }

        )

    );

    document.getElementById("tableRow2").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                document.getElementById("tokenInput").value = (recent["Recent"][2]);
            }

        )

    );

    document.getElementById("tableRow3").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                document.getElementById("tokenInput").value = (recent["Recent"][3]);
            }

        )

    );





    document.getElementById("tokenSubmit").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                var token = ((document.getElementById("tokenInput").value).trim());
                var file = ("https://gist.githubusercontent.com/SHArdowYT" + "/" + token + "/" + "raw");

                var request = await fetch(file);
                var responseStatus = await (request.status);
                var responseData = await (request.text());

                if (responseStatus == 200)
                {

                    if ((responseData.substring(0, 14)) == "<!--SHArdow-->")
                    {
                        console.log(recent);
                        (recent["Recent"]).unshift(token);
                        localStorage.setItem("recent", (JSON.stringify(recent)));
                        document.open();
                        document.write(responseData);
                        document.close();
                    }
                    else if ((responseData.substring(0, 14)) != "<!--SHArdow-->")
                    {
                        document.getElementById("tokenInstructions").innerHTML = "⚠ invalid token!"
                    }
                    else
                    {
                        throw "Impossible Condition";
                    }

                }
                else if (responseStatus != 200)
                {
                    document.getElementById("tokenInstructions").innerHTML = "⚠ invalid token!"
                }
                else
                {
                    throw "Impossible Condition";
                }

            }

        )

    );

}

forwarder();



