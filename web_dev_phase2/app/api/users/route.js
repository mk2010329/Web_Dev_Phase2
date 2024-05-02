import ItemsRepo from "@/app/repo/UsersRepo";
// const accountsRepo = new AccountsRepo();

export async function GET(request){
    const Items = await ItemsRepo.getItems();
    console.log(Response.json(Items));
    return Response.json(Items,{status:200});
}