let storeData = [
    {
        name:"HUBLOT",
        model:"Spirit of Big Bang ",
        color:"Sky Blue",
        price:"$27,400",
        image:"https://content.thewosgroup.com/productimage/17171228/17171228_1.jpg?impolicy=zoom",


    },
    {
        name:"Jacob & Co",
        model:"Twin Turbo Furious Sapphire Red",
        color:"Black Dial",
        price:"$1,500,000.00",
        image:"https://content.thewosgroup.com/productimage/18102898/18102898_1.jpg?impolicy=hero&imwidth=700",
     

    },
    {
        name:"Louis Vuitton",
        model:"M14642",
        color:"Brown",
        price:"$3500",
        image:"https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-low-key-cookie-mm--M14642_PM2_Front%20view.png?wid=1090&hei=1090",


    },
    {
        name:"Louis Vuitton",
        model:"M13269",
        color:"Darkesh Brown",
        price:"$6799",
        image:"https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-x-tm-onthego-pm--M13269_PM1_Back%20view.png?wid=1090&hei=1090",

    }
]

let storeListEl = document.querySelectorAll('.store-container')[0];

function ListStore (store) {
    for(let i = 0 ; i < store.length ; i++){
        let storePage = storeItems( store[i]);
        storeListEl.innerHTML += storePage;
    }
}
ListStore(storeData)

function storeItems (item) {
    return `
    <div class = "store-product">
            <img src = "${item.image}" alt = "${item.name}" >
            <h2> ${item.name} </h2>
            <p> ${item.model} </p>
            <p> ${item.color} </p>
            <p> ${item.price} </p>

    </div>
    `
}