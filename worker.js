


self.addEventListener
(

    "install",
    (

        async function(event)
        {

            await event;
            var piscesCaches = await caches.open("pisces");
            return piscesCaches.addAll
            (
                [
                    "/",
                ]
            );



        }

    )

);








`
self.addEventListener
(

    "fetch",
    function (event)
    {
        event.respondWith
        (
            caches.match(event.request)
            .then
            (
                function(response)
                {

                    if ((!!response) == true)
                    {
                        return response
                    }
                    else if ((!!response) == false)
                    {
                        return fetch(event.request)
                        .then
                        (
                            async function (response)
                            {
                                var cache = await caches.open("pisces");
                                cache.put((event.request), (response.clone()));
                                return response
                            }
                        )
                    }


                }
            )
        )
    }

)



`



self.addEventListener
(

    "fetch",
    function (event)
    {
        event.respondWith
        (

            caches.open("pisces")
            .then
            (
                function (cache)
                {

                    return fetch(event.request)
                    .then
                    (
                        function (response)
                        {

                            if ((response.status) == 200)
                            {

                                cache.put((event.request), (response.clone()));
                                return response;

                            }
                            else if ((response.status) != 200)
                            {

                                return response;

                            }

                        }
                    )
                    .catch
                    (
                        function (error)
                        {

                            return cache.match(event.request);

                        }
                    )

                }
            )

        )
    }

)



