import ItemsRepo from "@/app/repo/ItemsRepo";
// const accountsRepo = new AccountsRepo();

export async function GET(request){
    const Items = await ItemsRepo.getItems();
    console.log(Response.json(Items));
    return Response.json(Items,{status:200});
}

export async function PUT(request, { params }) {
    const id = params.id;
    const book = await request.json()
    const updatedBook = await booksRepo.updateBook(isbn, book)
    return Response.json(updatedBook)
}

export async function POST(request) {

    const book = await request.json()
    console.log(book);
    const newBook = await booksRepo.addBook(book)
    return Response.json(newBook)

}