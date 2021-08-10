//SHArdow

async function forwarder()
{


    try
    {
        document.body.style.zoom = ((String((1 / (window.devicePixelRatio)) * 100)) + "%")
    }
    catch (error)
    {
    }



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
        while ((repeats < ((recent["Recent"]).length)) && (repeats < 12))
        {
            document.getElementById("tableRow" + (String(repeats))).innerHTML = (recent["Recent"][repeats]);
            document.getElementById("tableRow" + (String(repeats))).addEventListener
            (

                "mousedown",
                (

                    async function()
                    {
                        document.getElementById("tokenInput").value = (recent["Recent"][(parseInt((this.id).substr(8, )))]);
                    }

                )

            )
            repeats = repeats + 1;
        }

        document.getElementById("tokenInput").value = (recent["Recent"][0]);

    }
    else
    {
        throw "Impossible Condition";
    }








    document.getElementById("tokenSubmit").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                var token = ((document.getElementById("tokenInput").value).trim());


                if (token == "reset")
                {
                    localstorage.clear();
                }
                else if (token != "reset")
                {



                    var file = ("https://gist.githubusercontent.com/SHArdowYT" + "/" + token + "/" + "raw");

                    var request = await fetch(file);
                    var responseStatus = await (request.status);
                    var responseData = await (request.text());
                    console.log(file)

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
                            console.log(responseData)
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
                else
                {
                    throw "Impossible Condition";
                }

            }

        )

    );

}

forwarder();



