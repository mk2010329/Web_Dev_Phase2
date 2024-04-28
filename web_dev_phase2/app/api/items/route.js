import ItemsRepo from "@/app/repo/ItemsRepo";
// const accountsRepo = new AccountsRepo();

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const name = searchParams.get('name');

    if(!name){//if there is no name
        const Items = await ItemsRepo.getItems();
        return Response.json(Items,{status:200});
    }else{//if there is a name
        const Items = await ItemsRepo.getItem(name);
        return Response.json(Items,{status:200});
    }
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