//SHArdow

async function forwarder()
{

    document.getElementById("tokenSubmit").addEventListener
    (

        "mousedown",
        (

            async function()
            {
                var token = (document.getElementById("tokenInput").value);
                var file = ("https://gist.githubusercontent.com/SHArdowYT" + "/" + token + "/" + "raw");

                var request = await fetch(file);
                var responseStatus = await (request.status);
                var responseData = await (request.text());

                if (responseStatus == 200)
                {

                    if ((responseData.substring(0, 14)) == "<!--SHArdow-->")
                    {
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



