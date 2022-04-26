const express = require("express")
const app = express()
const cors = require('cors')
const { default: mongoose } = require("mongoose")

app.use(cors())
app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb://localhost:27017/heroes")

const heroesSchema = new mongoose.Schema({
    slug: String,
    name: String,
    power: [String],
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String
})

const HeroesModel = mongoose.model("heroes", heroesSchema)

app.get("/heroes", function (req, res, next) {
    HeroesModel.find({
    })
        .exec().then(resultat => {
            res.json(resultat)
        })
})

app.get("/heroes/:slug", function (req, res, next) {
    const slug = req.params.slug
    HeroesModel.findOne({ slug: slug })
        .exec().then(result => {
            res.json(result)
        })
})

app.get("/heroes/:slug/power", function (req, res, next) {
    const slug = req.params.slug
    HeroesModel.findOne({ slug: slug })
        .exec().then(result => {
            res.json(result.power)
        })
})

app.post('/heroes', function (req, res, next) {
    const body = req.body
    const newHeroes = new HeroesModel(body)
    newHeroes.save().then(heroes => res.json(heroes))
    console.log(body)
})



// HeroesModel.insertMany([{


//     slug: "iron-man",
//     name: "Iron Man",
//     power: ["money"],
//     color: "red",
//     isAlive: true,
//     age: 46,
//     image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
// },
// {
//     slug: "thor",
//     name: "Thor",
//     power: ["electricty", "worthy"],
//     color: "blue",
//     isAlive: true,
//     age: 300,
//     image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
// },
// {
//     slug: "dardevil",
//     name: "Daredevil",
//     power: ["blind"],
//     color: "red",
//     isAlive: false,
//     age: 30,
//     image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
// }])







app.listen(3004, () => {

})