let url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
let url2 = "&appid=7eb24a10d2ef5b0a21725c6521763cca"
let imgurl1 = "https://api.unsplash.com/search/photos?page=1&query="
let imgurl2 = "&per_page=1&orientation=landscape&client_id=ymnv1jw5EnOSPlwE9vNeemaCwLu_Sl_3BSzos0tfG6M"
let input = document.querySelector("input")
let icon = document.querySelector("#icon")

let temp = document.querySelector("#temp h1")
let env = document.querySelector("#temp h3")
let visual = document.querySelector("#visual img")
let city = document.querySelector("#city h2")
let wind = document.querySelector("#wind .right #top")
let humidity = document.querySelector("#humidity .right #top")
let cityimg = document.querySelector("#cityimg")
let data
let response
let imgres
let imgdata
let overlay = document.querySelector("#overlay")

let url = `${url1}paris${url2}`
let imgurl = `${imgurl1}paris${imgurl2}` 


async function setData()
{
    response = await fetch(url)
    console.log(response)
    data = await response.json()
    console.log(data)
    
    temp.textContent = data["main"]["temp"].toFixed(0) + "°C"
    env.textContent = data["weather"][0]["description"]
    visual.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@4x.png`
    city.textContent = data["name"]
    wind.textContent = data["wind"]["speed"] + "km/h"
    humidity.textContent = data["main"]["humidity"] + "%"

    let env1 = env.textContent.slice(0, 1)
    env1 = env1.toUpperCase()
    let env2 = env.textContent.slice(1, )
    env.textContent = env1 + env2

    imgres = await fetch(imgurl)
    imgdata = await imgres.json()
    let imgsrc = imgdata["results"][0]["urls"]["raw"]
    console.log(imgsrc)
    cityimg.src = imgsrc
}

setData()



input.addEventListener("keydown", (event)=>
{
    
    if (event.key === "Enter")
    {
        console.log("hi")
        url = `${url1}${event.target.value.toLowerCase()}${url2}`
        imgurl = `${imgurl1}${event.target.value}${imgurl2}`
    
        async function getData()
        {
            response = await fetch(url)
            console.log(response)
            data = await response.json()
            console.log(data)

            if (data["cod"]==="404")
            {
                overlay.style.visibility = "visible"
            }

            else
            {
                overlay.style.visibility = "collapse"
            }
            
            temp.textContent = data["main"]["temp"].toFixed(0) + "°C"
            env.textContent = data["weather"][0]["description"]
            // visual.src = `http://127.0.0.1:5500/Projects/Weather-search/${env.textContent}.png`
            visual.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@4x.png`
            city.textContent = data["name"]
            wind.textContent = data["wind"]["speed"] + "km/h"
            humidity.textContent = data["main"]["humidity"] + "%"

            let env1 = env.textContent.slice(0, 1)
            env1 = env1.toUpperCase()
            let env2 = env.textContent.slice(1, )
            env.textContent = env1 + env2

            imgres = await fetch(imgurl)
            imgdata = await imgres.json()
            let imgsrc = imgdata["results"][0]["urls"]["raw"]
            console.log(imgsrc)
            cityimg.src = imgsrc
        }
    
        getData()
    }
 
})
// icon.addEventListener("click", handleSearch())