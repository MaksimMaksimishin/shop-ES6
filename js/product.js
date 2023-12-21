export class Product {
    constructor(id, name, price, imageUrl, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = `img/${imageUrl}`; // Путь к изображению в папке "img"
        this.description = description;
    }
}