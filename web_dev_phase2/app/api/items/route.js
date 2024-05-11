import ItemsRepo from "@/app/repo/ItemsRepo";
// const accountsRepo = new AccountsRepo();

export async function GET(request){
    // const {searchParams} = new URL(request.url);
    // const name = searchParams.get('name');

    // if(!name){//if there is no name
        const Items = await ItemsRepo.getAllItems();
        return Response.json(Items,{status:200});
    // }else{//if there is a name
        // const Items = await ItemsRepo.getItem(name);
        // return Response.json(Items,{status:200});
    // }
}

// export async function PUT(request) {
    
// }

export async function POST(request) {

}