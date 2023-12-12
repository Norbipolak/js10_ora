/*
December 7-e órának a leírása
Megjelennitettük a termékeket, ha megnyítás gombra rákattintunk, akkor átvisz minket a főoldalról 
ami 127.0.0.1:8080 az adott terméknek az oldalára ami 127.0.0.1:8080/products.html?id=1 (első termék)
A category-nak már van legördülő kiválasztója, ahol tudunk választani a termékkategóriák közül 

Az a cél, hogy felülírjuk a többit (brand, title, price), lehessen imitálni a felülírást.
Jó lenne ha a brand, title és a pricenál is megjelennének input mezők.

ezt a Products.js-en belüli showProductData(productData)-ban fogjuk csinálni.

Csinálunk input mezőket a brand-tól kezdve, 
és ennek az inputmezőnek a value az lesz a productData.brand-je
amelyik meg van jelölve egy x-vel, az mostani módosítás.
*/ 

showProductData(productData) {
    this.productImg.src = product.thumbnail 

    const tr = document.createElement("tr");
    const tdID = document.createElement("td");
    td.innerText = productData.id;

    const tdCategory = document.createElement("td");
    const select = document.createElement("slecet");
    tdCategory.appendChild(select);
    this.createCategorySelect(select, productData.category);

    const tdBrand = document.createElement("td");
    /*tdBrand.innerText = productData.brand; -> ez innen ki lesz törölve a következő két sor miatt*/
    const inputBrand = document.createElement("input"); /* X */
    inputBrand.value = productData.brand; /* X */
    tdBrand.appendChild(inputBrand); /* X */

    const tdTitle = document.createElement("td");
    /*tdTitle.innerText = productData.title; -> ez innen ki lesz törölve a következő két sor miatt*/
    const inputTitle = document.createElement("input"); /* X */
    inputTitle.value = productData.title; /* X */
    tdTitle.appendChild(inputTitle);

    const tdPrice = document.createElement("td");
    /*tdPrice.innerText = productData.price + "$"; -> ez innen ki lesz törölve a következő két sor miatt*/
    const inputPrice = document.createElement("input"); /* X */
    inputPrice.value = productData.price; /* X */
    tdPrice.appendChild(inputPrice); /* X */

    const tdUpdate = document.createElement("td"); /* X */
    const buttonUpdate = document.createElement("button"); /* X */
    buttonUpdate.innerText = "Update"; /* X */
    tdUpdate.appendChild(buttonUpdate); /* X */

    tr.appendChild(tdID);
    tr.appendChild(tdCategory);
    tr.appendChild(tdBrand);
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdUpdate); /* X */

    buttonUpdate.addEventListener("click", ()=> { /* X */
        const category = select.value.trim(); /* X */
        const brand = inputBrand.value.trim(); /* X */
        const title = inputTitle.value.trim(); /* X */
        const price = parseInt(inputPrice.value.trim()); /* X */
        const id = getUrlVariable("id") /* X */

        this.updateProduct({ /* X */
            id:id, /* X */
            category:category, /* X */
            brand:brand, /* X */
            title:title, /* X */
            price:price /* X */
        });
    });

    this.productTable.appendChild(tr);
}
/*
Megcsináltuk a változtatásokat, csinálunk egy plusz rubrikát (egy update gombot) az ID, Category, Brand, Title, Price mellé.
A product.html-be fogjuk csinálni. 
<table class="table-stripped" id="product-table">
    <tr>
        <th>ID</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Title</th>
        <th>Price</th>
        <th>Update</th>  -> ezt az updated csináltuk most
    </tr>
</table>

visszamegyünk a Products.js-re és a showProductData(productData) belül csinálunk egy update gombot ->
tdPrice.appendChild(inputPrice) alatt és a tr.appendChild(tdID) felé

tr.appendChild(tdUpdate); miután appendChild-oltuk a tdUpdate-t
utána megjelent az update gomb az oldalunk és ha rányomunk a gombra, akkor meg kell hívnunk az async updateProdcut-ot, 
amit most fogunk ide elkészíteni. -> a createCategorySelect alatt lesz 
*/
async updateProduct(producData) {
    /*const id = getUrlVariable("id");*/

    const id = productData.id;
    delete productData.id;

    const response = await fetch("https://dummyjson.com/products/" + id, {       
    method:"PUT",
    body: JSON.stringify(productData), 
    headers: {"content-type":"application/json"}
});
    if(response.ok) {
        alert("Sikeres felülírás!");
    }
}
/*
Úgy updatelünk, hogy ezen az oldalon vagyunk 127.0.0.1:8080/product.html?id=1 
Itt az id az meg van az url-ben -> id=1 
tehat azt tudjuk, modani, hogy const id = getUrlVariable("id"); -> késöbb parseInt(getUrlVariable("id")); a buttonUpdate.eventListener-ben

így lehet updatelni -> 
const response = await fetch("http://dummyjson.com/products/" + id {       id, ami majd az url-ben van
    method:"PUT",
    body: productData, updateProduct()-ba beleírjuk, hogy productData -> updateProduct(productData)       itt fogjuk megkapni az üzennettestet
    headers: {"content-type":"application/json"}
});

ha ezt megcsináltuk 
hogy tudjuk megjeleníteni az adatainkat? -> visszamegyünk a productData-ba és a buttonUpdate-nek adunk egy addEventListener-t 
ott csináltuk meg az összes input mezőt a category-nak, type-nak... 
a buttonUpdate.addEventListener-be pedig egyenlővé teszük a következőképpen 
    const category = select.value.trim();
    const brand = inputBrand.value.trim();
    const title = inputTitle.value.trim();
    const price = inputPrice.value.trim() -> lehet ParseInt(inputPrice.value.trim())

    ha ezeket egyenlővé tettük, akkor meghívjuk a this.updateProduct()-ot a showProductData-ban
    még a buttonUpdate.eventListener-ön belül, amin belül átadunk egy objektumot.

    this.updateProduct({
        category:category,
        brand:brand,
        title:title,
        price:price
    });

    és még leszedjük itt az id-t is itt, a updateProduct(productData)-ból pedig kitöröljük, és akkor ->
    this.updateProduct({
        id:id,
        category:category,
        brand:brand,
        title:title,
        price:price
    }); 

    Még két változtatást fogunk csinálni
    1.
    async updateProduct(producData) {

    const response = await fetch("https://dummyjson.com/products/" + id, {       
    method:"PUT",
    body: productData, 
    headers: {"content-type":"application/json"} 

    -id helyett productData.id lesz és azzal fogjuk létrehozni az Url-t ->

    async updateProduct(producData) {

    const response = await fetch("https://dummyjson.com/products/" + productData.id, {       
    method:"PUT",
    body: productData, 
    headers: {"content-type":"application/json"} 

    és mivel egy objektum, amit átadunk ezért 
    body: productData -> JSON.stringify-ozni kell 
    body: JSON.stringify(productData), 

    ha console.log(productData)-át
    ezt kapjuk az oldalon: 
    {id:1, category: 'smartphones', brand: 'Apple', title: 'iPhone 9', price: 549}
    brand: "Apple"
    category: "smartphones"
    id: 1 
    price: 549
    title: "iPhone 9"
    [[Prototype]]: Object

    Az a baj, hogy visszatettük az id-t a productData-ba és ez nem tetszik neki
    mégis az updateProduct-ba kell 

    const id = productData.id;
    delete productData.id;
    és ki kell cserélni a const response = await fetch("https://dummyjson.com/products/" + productData.id,
    -> const response = await fetch("https://dummyjson.com/products/" + id,

    !!!!!!! nem szereti, ha benne van a bodyban az id. !!!!!!!!!!!!!!!!!!!!!!!!!!

    és utána még csinálunk egy if-et a response-ra, ha sikeres, akkor felül kiírja egy alert-be,
    hogy sikeres felülírás. 
    A végső verzió -> 
    async updateProduct(producData) {

    const id = productData.id;
    delete productData.id;

    const response = await fetch("https://dummyjson.com/products/" + id, {       
    method:"PUT",
    body: JSON.stringify(productData), 
    headers: {"content-type":"application/json"}
});
    if(response.ok) {
        alert("Sikeres felülírás!");
    }
}

Ha átmegyünk az oldalunkra és átakarunk valamit írni, brand, price stb. 
akkor csak beleírjuk az input mezőnkbe és felülírja.

Egész folyamat leírása: 
1. showProductData(productData)-ban csinálunk input mezőket, amiket majd appendChild-olunk
2. csinálunk html-ben egy button-t amit lementünk és csinálunk neki egy addEventListener-t, ahol egyenlővé teszünk 
const-okat a már itt lementett dolgok value-aival pl. const brand = inputBrand.value.trim()
3. megcsináljuk az async updateProduct(productData) függvényt 
4. meghívjuk ezt az updateProduct-ot, úgy hogy értékként kapjon egy objektet-amiben értékpárok vannak.
pl. brand:brand,
szóval a brandünk legyen az a brand, amit már elöbb lementettünk -> const brand = inputBrand.value.trim()
5. updateProduct(productData)-ban megcsináljuk a response-ot - JSON.stringify!
és ha megfelelő a response, nincsen hiba, akkor adunk egy alert-et
**********************************************************************************************************************
Hogyan tudunk új terméket felvinni lesz a következő, amit rögtön az updateProduct alatt tudunk csinálni 
*/

asnyc addProduct(productData) {
    const response = await fetch("https://dummyjson.com/products/add", {
    method:'POST',
    headers:{"content-type":"application/json"},
    body: JSON.stringify(producData)
    });

    const json = await response.json();
}
/*
az addProduct() függvény megint meg fogja kapni értékként a productData-t -> asnyc addProduct(productData)

csinálunk neki egy add-product html-t ahol lesz egy form-unk, amiben van egy div class="grid-2" abban van pl.category, ami egy 
select mező és a selectben lesz egy option tag amiben az értéke 0 és az van beleírva, hogy Válassz kategóriát!

</body>
    <div class="container">
        <button>
            <a href="http://127.0.0.1:8080">Vissza!</a>
        </button>

        <form id="product-form">
            <div class="grid-2">
                <div class="box">
                    <h3>Category</h3>
                    <select id="category"></select>
                        option value="0">Válassz Kategoriát!</option>

                    <h3>Brand</h3>
                    <input type="text" id="brand">
                </div>

                <div class="box">
                    <h3>Title</h3>
                    <input type="text" id="title">

                    <h3>Price</h3>
                    <input type="text" id="price">
                </div>
            </div>


            <button id="add-product">Add product</button>
        </form>

    </div>

        <script type="module" src="products.executer.js"><script>
</body>

beírjuk, hogy 127.0.0.1.:8080/add_product.html 
úgy fog kinézni, hogy felül lesz egy vissza link erre az a-ra 127.0.0.1.:8080
utána mivel div-ben vannak egymás alatt a Category, Brand és tölük jobbra egymás alatt a title, price
alul pedig az Add product buttonunk 
Ezek után formázunk kicsit, amit ideírtam a style.css-be 
a div-eknek megadtunk egy class="box"-ot és csináltunk neki egy border-t és egy kicsit sötétebb background-color-t

Első feladat az, hogy megjelenitsűk a kategóriákat a select-mezőnkben
de erre már készítettünk egyszer egy createCategorySelect függvényt ->

async createCategorySelect(select, currentCategory = "") {
    const categories = await this.getCategories();

    for(const category of categories) {
        const option = document.createElement("option");
        option.innerText = category;
        select.appendChild(option),

        if(currentCategory === category) {
            option.selected = true;
        }
    }
}

products.executer-ben eddig ez található ->
*/
import Products from "./Products.js"

const p = new Products();

if(location.pathname === "/" || location.pathname === "/index.html") {
    p.getProducts()
} else if(location.pathname === "/product.html") {
    p.getProductByID()
} else if(location.pathname === "/add_product.html") { /* X */
    const categorySelect = document.querySelector("category"); /* X */
    const addProductBtn = document.querySelector("#add-product"); /* X */
    const productForm = document.querySelector("product-form"); /* X */
    p.createCategorySelect(categorySelect); /* X */

    addProductBtn.addEventListener("click", function(e) { /* X */
        e.preventDefault(); /* X */

        const formData = new FormData(productForm); /* X */
        const productData = {}; /* X */

        for(const entry of entries) { /* X */
            productData[entry[0]] === entry[1]; /* X */
        }

        p.addProduct(productData); /* X */

    })
}
// ezzel az oldalon a legördülővel megjelentek a kategóriák.
/*
Módszer arra, hogyan tudjuk egyszerre beszedni a form-nak az adatait ->
form-nak adunk egy id-t id="product-form"
a buttonnak is adunk adunk egy id-t id="add-product"
amiket lementünk a products.executer.js-ben 

lehet a button lementése és eventListener a pathname="/add_product.html"-en belül már máshol nem kell

!!!!!!!!!!!!!FormData!!!!!!!!!!!!!!!!!!!!
Ha a new FormData() megkap egy formot, egy htlm elemet, ami form -> new FormData(productForm) 
a konstruktorába, akkor annak az adait be tudja szedni.
A formData az egy objektum 
- append: f append() - appendel tudunk belerakni valamit 
- delete: f delete() - a delete-vel törölni 
és ami nekünk kell it az az entries: f entries()

Ennek az adatait be kell tölteni egy productData objektumba. -> const productData = {};
amit beletöltünk: 
for(cosnt entry of formData.entries) {

}

!!!!!!!! ahhoz, hogy müködjön ez az entries dolog, ahhoz nem id-kat, hanem name-ket megadni a html-ben 
a category, brand, title, price-hoz

        <form id="product-form">
            <div class="grid-2">
                <div class="box">
                    <h3>Category</h3>
                    <select id="category" name="category"></select>
                        option value="0">Válassz Kategoriát!</option>

                    <h3>Brand</h3>
                    <input type="text" name="brand">
                </div>

                <div class="box">
                    <h3>Title</h3>
                    <input type="text" name="title">

                    <h3>Price</h3>
                    <input type="text" name="price">
                </div>
            </div>


            <button id="add-product">Add product</button>
        </form>

és a select-nek kell egy id, mert az alapján szelektáljuk a kategóriákat ->
eiatt const categorySelect = document.querySelector("category")

Entries() -> tömbben lévő tömbök és a belső tömbök első eleme az egy kulcs itt -> category, brand, title, price
a másik meg egy érték. ->
['category', '0']
['brand', '']
['title', '']
['price', '']

!!! A kulcs jelen esetben ugyanaz, amit megadtunk name-attributumnak az input mezőinknek
az értéke pedig az input mezőinknek az értékei.

ha az input mezőinkbe beírunk valamit az oldalon ->

['category', 'skincare']
['brand', 'Nivea']
['title', 'asdfgd']
['price', '4466']

a for-ban -> productData[entry[0]] (ez lesz a kulcsunk) = entry[1] (értékkel)
így fog kinézni a productData -> console.log(productData);
miután beírjuk az oldalon, hogy category - laptops, brand - Apple, title - Iphone XX, price - 45436

{category: 'laptops', brand: 'Apple', title: 'Iphone XX', price:'45436'}
brand: "Apple"
category: "laptops"
price: "45436"
title: "Iphone XX"
[[Prototype]]: Object

ezeket az adatokat kell majd átadnunk az addProduct-nak amit az elöbb csináltunk a Products.js-ben

asnyc addProduct(productData) {
    const response = await fetch("https://dummyjson.com/products/add", {
    method:'POST',
    headers:{"content-type":"application/json"},
    body: JSON.stringify(producData)
    });

a productData már meg van, és megfogjuk hivni a products.executer.js-ben
a addProduct(productData), melghozzá ilyen formában ->

    } else if(location.pathname === "/add_product.html") { 
    const categorySelect = document.querySelector("category"); 
    const addProductBtn = document.querySelector("#add-product"); 
    const productForm = document.querySelector("product-form"); 
    p.createCategorySelect(categorySelect); 

    addProductBtn.addEventListener("click", function(e) { 
        e.preventDefault(); 

        const formData = new FormData(productForm); 
        const productData = {}; 

        for(const entry of entries) { 
            productData[entry[0]] === entry[1]; /
        }

        p.addProduct(productData); 


Ham most beírunk random adatokat, akkor ez látjuk majd az oldalunk console-ján, ha jól ment minden akkor egy ilyen response-ot kapunk vissza->
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: ""
type: "cors"
url: "https://dummyjson.com/products/add"
[[Prototype]]: Response

beírtuk utána, hogy const json = await response.json() és megnézzük, hogy milyen json választ kaptunk
azt is meg tudnánk nézni hogy milyen text-et ha azt írnánk be, hogy response.text()

JSON válasz: 
{id: 101, title:''assdsad', price: '445435', brand: 'assdsf', category: 'home-decoration'}
brand: "assdsf"
category: "home-decoration"
id: 101
price: "445435"
title: "assdsad"
[[Prototype]]: Object 

id:101 ,azért mert eddig 100 termék van fent
***********************************************************************************************************************************
Törlés 

Az addProduct alá csinálunk egy deleteProduct-ot
*/
async deleteProduct(id) {
    const response = await fetch("https://dummyjson.com/products" + id {
        method: 'DELETE'
    });
    const json = await response.json()
}
/*
Törléshez szükséges egy id az url végére!!!!!!!!, amit bekérünk async deleteProduct(id)
https://dummyjson.com/products/1

az oldalon a grid-2-ben alul van egy price és egy megnyitás button grid-box1 az a price  
most a price helyére csinálunk egy törlés buttont
ehhez -> a createProductsHtml(products)-nál van egy olyanunk ->
*/

const grid2 = document.createElement("div");
grid2.classList.add("grid-2");
const gridBox1 = document.createElement("div");
gridBox1.classList.add("grid-box")
gridBox1.innerText = product.price + "$"

/*
Azt mondjuk, hogy a deleteBtn-nek adunk egy attributumot ami az lesz, hogy product-id
ez egy saját id és ugyanugy a getAttributummal tudjuk, majd leszedni, mint bármelyik másik attributumot és 
azt mondjuk, hogy a product.id -> deleteBtn.setAttribute("product-id", product.id)

átalakítás után ->
*/
const grid2 = document.createElement("div");
grid2.classList.add("grid-2");
const gridBox1 = document.createElement("div");
gridBox1.classList.add("grid-box")
deleteBtn.innerText = "Delete!";
deleteBtn.setAttribute("product-id", product.id);
gridBox1.appendChild(deleteBtn);

/*
Ugyanitt a createProductsHtml(products) legalján csinálunk neki egy eventListenert
*/
deleteBtn.addEventListener("click" ()=> {
    const productID = parseInt(deleteBtn.getAttribute("product-id"));
    this.deleteProduct(productID);
});
/*
arra figyelünk, hogy ez arrow function legyen!!! mert megváltozik a scope és nem tudnánk a this.deleteProductot meghívni
visszaadta az összes termékadatot ->
brand: "Apple"
category: "smartphones"
deletedOn: ""
*/